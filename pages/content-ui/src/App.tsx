import { Button } from '@extension/ui';
import { debounce } from 'lodash';
import { Pause, Play } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Controller, SubmitHandler, useForm, UseFormGetValues } from 'react-hook-form';
import { AutoBookCollaps } from './AutoBookCollaps';
import { RangeSliderInput } from './RangeSliderInput';
import { LoadTables } from './ShipmentExpanded';
import { Switch } from './Switch';
import { Relay } from './relay.type';
import { ControlPanelState, DataView, DataViewType } from './type';
import { useFetchApiListener } from './useFetchApiListener';
import { createRandomInterval } from './utils';

function getRefreshButton() {
  return document.querySelector<HTMLButtonElement>('#utility-bar div.refresh-and-chat-box button');
}

function turnOffAmazonAutoRefresh() {
  const el = document.querySelector<HTMLInputElement>(
    '#utility-bar > div > div > div.refresh-and-chat-box > div > div > div > div > div > label > input',
  );

  if (el && el.checked) {
    el.click();
  }
}

function isPageRefreshDisabled() {
  const el = document.querySelector<HTMLParagraphElement>(
    '#utility-bar > div > div > div.refresh-and-chat-box > div > div > div > p',
  );

  return el?.textContent === 'Turn on auto refresh';
}

function clickRefreshButton() {
  if (!isPageRefreshDisabled()) return;

  const btn = getRefreshButton();

  if (btn) {
    btn.click();

    return true;
  }

  return false;
}

function getFirstItem() {
  return document.querySelector<HTMLDivElement>(
    '#active-tab-body > div > div > div > div > div.load-list > div:nth-child(1)',
  );
}

function watchDomPromise() {
  return new Promise<boolean>(res => {
    let t = 0;
    const c = watchDom(() => {
      c();
      clearInterval(t);
      res(true);
    });

    t = setTimeout(() => {
      c();
      res(false);
    }, 1000 * 10);
  });
}

function watchDom(onAppear: () => void) {
  let i = 0;

  const c = () => clearInterval(i);

  i = setInterval(() => {
    if (getFirstItem()) {
      c();
      onAppear();
    }
  }, 50);

  setTimeout(c, 1000 * 30);

  return c;
}

const audio = new Audio(chrome.runtime.getURL('content-ui/sound-1.wav'));

/**
 * function to insert style tag to head with body of #utility-bar bottom 130px with important
 * @returns
 */
function insertStyleTag() {
  const style = document.createElement('style');
  style.innerHTML = `#utility-bar { bottom: 105px !important; }
#active-tab-body { padding-bottom: 200px; }
@media (min-width: 900px) {
  .chat-box-position {
    right: 1%;
    bottom: 13%;
  }
}`;
  document.head.appendChild(style);
}

export default function App() {
  useEffect(() => {
    insertStyleTag();
  }, []);
  return <ControlPanel />;
}

type RefreshManagetConfig = {
  range: [number, number];
  change_price: number;
  auto_expand: boolean;
  data_view_type: DataViewType;
};

function getDiff(
  new_data: Relay.WorkOpportunity[],
  current: Relay.WorkOpportunity[],
  change: number,
): Relay.WorkOpportunity[] {
  const currentMap = new Map<string, number>();
  // Populate the map with current items: key is id, value is price
  for (const item of current) {
    currentMap.set(item.id, item.payout.value);
  }

  const result: Relay.WorkOpportunity[] = [];

  for (const newItem of new_data) {
    const oldPrice = currentMap.get(newItem.id);
    if (oldPrice === undefined) {
      // New item (id does not exist in the current data)
      result.push(newItem);
    } else if (newItem.payout.value - oldPrice >= change) {
      // Existing item with significant price change
      result.push(newItem);
    }
  }

  return result;
}

const gref: {
  items: Relay.WorkOpportunity[];
} = {
  items: [],
};

function moveLoadCardToTop(ids: string[]) {
  // Get the load-list container
  const loadList = document.querySelector('.load-list');
  if (!loadList) return;

  let targetLoadCard: HTMLDivElement | null = null;
  console.log(ids);

  for (const targetId of ids) {
    // Find the card with the matching ID
    const targetCard = loadList.querySelector(`div > div[id="${targetId}"]`);
    if (!targetCard) return;

    // Get the parent load-card element
    targetLoadCard = targetCard.parentElement as HTMLDivElement;

    // set light green background to targetLoadCard
    targetLoadCard.setAttribute('style', 'background:rgb(224 255 222) !important');

    if (!targetLoadCard) return;

    // Move the card to the top by inserting before the first child
    loadList.insertBefore(targetLoadCard, loadList.firstChild);
  }

  // set light green background to targetLoadCard
  if (targetLoadCard) {
    targetLoadCard.setAttribute('style', 'background:rgb(182, 227, 255) !important');
  }

  return targetLoadCard;
}

function clickRowActionOverset(cb: (el: HTMLDivElement, e: Event) => void) {
  // Get the load-list container
  const cards = document.querySelectorAll<HTMLDivElement>('.load-list > div');

  if (!cards || !cards.length) return;

  // set click events and stop propagation
  cards.forEach(card => {
    // @ts-ignore
    card.firstChild.addEventListener('click', e => {
      cb(card.firstChild as any, e);
    });
  });
}

function insertToDom(card: HTMLDivElement) {
  const id = card.querySelector('div[id]')?.id || '';
  const wo = gref.items.find(i => i.id === id);
  if (!wo) return;

  const rootDiv = document.createElement('div');
  rootDiv.id = 'react-shipment-root';
  card.appendChild(rootDiv);

  // Render the React component
  const root = ReactDOM.createRoot(rootDiv);

  root.render(
    <LoadTables
      workOpportunity={wo}

      // onClear={() => {
      //   prevSibling.classList.remove('opened');
      //   root.unmount();
      //   rootDiv.remove();
      // }}
    />,
  );
}

class RefreshManager {
  config: RefreshManagetConfig = {
    range: [100, 5000],
    change_price: 100,
    auto_expand: false,
    data_view_type: 'both',
  };
  running = false;

  setConfig() {
    this.config.range = [1, 20];
  }
  start() {
    this.stop = createRandomInterval(clickRefreshButton, this.config.range);
  }

  clickOverset() {
    if (this.config.data_view_type !== DataView.new) {
      clickRowActionOverset(el_with_id => {
        if (this.config.data_view_type === DataView.both && el_with_id) {
          if (!el_with_id.classList.contains('opened')) {
            el_with_id.classList.add('opened');
            insertToDom(el_with_id.parentElement as any);
          } else {
            el_with_id.classList.remove('opened');
            el_with_id.nextSibling?.remove();
          }
        }
      });
    }
  }

  stop() {}
  onStop() {}
  restart() {
    if (this.running) {
      this.stop();
      this.start();
    }
  }
}

const ControlPanel = () => {
  const { handleSubmit, watch, control, setValue, getValues } = useForm<ControlPanelState>({
    defaultValues: {
      standart_refresh: false,
      human_like_refresh: false,
      data_view: 'both',
      newest_to_top: true,
      multi_tab: false,
      auto_open_data: false,
      auto_open_tab: false,
      non_stop_refresh: false,
      change_price: [50],
      refresh_interval: [5],
      range_refresh_interval: [1, 8],
    },
  });

  const onSubmit: SubmitHandler<ControlPanelState> = () => {};

  const standart_refresh = watch('standart_refresh');
  const human_like_refresh = watch('human_like_refresh');

  const [startApp, setStartApp] = useState(false);

  const refreshManager = useMemo(() => {
    const rf = new RefreshManager();

    rf.onStop = () => {
      setStartApp(false);
    };

    return rf;
  }, []);

  const debouncedChangeConfig = useCallback(
    debounce((getValues: UseFormGetValues<ControlPanelState>) => {
      const values = getValues();

      let range = values.range_refresh_interval;

      if (range) {
        // @ts-ignore
        range = range.map(a => a * 1000);
      }

      if (!values.standart_refresh && !values.human_like_refresh) {
        range = [values.refresh_interval[0] * 1000, values.refresh_interval[0] * 1000 + 10];
      }

      // if (refreshManager.config.range[0] !== range[0] || refreshManager.config.range[1] !== range[1]) {
      refreshManager.config.range = range;
      refreshManager.config.auto_expand = values.auto_open_data;
      refreshManager.config.change_price = values.change_price[0];
      refreshManager.config.data_view_type = values.data_view;

      refreshManager.restart();
      refreshManager.clickOverset();
    }, 200),
    [],
  );

  useFetchApiListener({
    onResponse: async data => {
      const prev_items = [...gref.items];

      // clickOverset uchun kerak bo'ladi
      gref.items = data.response.workOpportunities;

      watchDomPromise().then(r => {
        if (!r) return;

        refreshManager.clickOverset();
      });

      if (!refreshManager.running) return;

      if (prev_items.length === 0) return;

      const diffs = getDiff(gref.items, prev_items, refreshManager.config.change_price);

      if (!diffs.length) return;

      refreshManager.running = false;
      refreshManager.stop();
      refreshManager.onStop();
      audio.play();

      await watchDomPromise();

      const card = moveLoadCardToTop(diffs.map(a => a.id));

      if (!card) return;

      if (refreshManager.config.auto_expand) {
        // @ts-ignore
        card.firstChild?.click();
      }
    },
  });

  useEffect(() => {
    const { unsubscribe } = watch((value, info) => {
      if (info.name === 'standart_refresh' && value.standart_refresh) {
        setValue('range_refresh_interval', [0.5, 1.5]);

        if (value.human_like_refresh) {
          setValue('human_like_refresh', false);
        }
      }

      // standart_refresh o'chirish
      if (info.name === 'human_like_refresh' && value.human_like_refresh && value.standart_refresh) {
        setValue('standart_refresh', false);
      }

      debouncedChangeConfig(getValues);
    });

    return () => unsubscribe();
  }, [watch]);

  useEffect(() => {
    refreshManager.running = startApp;

    if (!startApp) {
      refreshManager.stop();
      return;
    }

    turnOffAmazonAutoRefresh();

    debouncedChangeConfig(getValues);

    return refreshManager.stop;
  }, [startApp]);

  return (
    <div className="shadow-xl border border-b-0 rounded-lg bg-slate-50 fixed left-1/2 -translate-x-1/2 bottom-0 z-[1001] w-full select-none">
      <form className="flex gap-10 pt-2 px-6 pb-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <Controller
            name="standart_refresh" // Field name
            control={control}
            render={({ field }) => <Switch label="Quick setup refresh" {...field} />}
          />
          <Controller
            name="human_like_refresh" // Field name
            control={control}
            render={({ field }) => <Switch label="Human like refresh" {...field} />}
          />
        </div>

        {!(standart_refresh || human_like_refresh) ? (
          <Controller
            key="refresh_interval" // Field name
            name="refresh_interval" // Field name
            control={control}
            render={({ field: { ref, ...field } }) => (
              <RangeSliderInput
                {...field}
                step={0.2}
                label={`Refresh every ${field.value} seconds`}
                onChange={v => field.onChange(v)}
                max={10}
                min={0.2}
              />
            )}
          />
        ) : (
          <Controller
            key="range_refresh_interval" // Field name
            name="range_refresh_interval" // Field name
            control={control}
            render={({ field: { ref, ...field } }) => (
              <RangeSliderInput
                {...field}
                step={0.2}
                disabled={standart_refresh}
                label={`Refresh randomly between ${field.value[0]} and ${field.value[1]} s.`}
                onChange={v => field.onChange(v)}
                max={10}
                min={0.2}
              />
            )}
          />
        )}

        <Controller
          name="data_view" // Field name
          control={control}
          render={({ field }) => (
            <Switch
              onChange={(e: { target: { checked: boolean } }) => {
                if (e.target.checked) {
                  field.onChange(DataView.both);
                } else {
                  field.onChange(DataView.new);
                }
              }}
              label="Old & new view"
              value={field.value === DataView.both}
            />
          )}
        />

        <div className="flex flex-col">
          <Controller
            name="newest_to_top" // Field name
            control={control}
            render={({ field }) => <Switch label="Highlighted to top" {...field} />}
          />
          <Controller
            name="auto_open_data" // Field name
            control={control}
            render={({ field }) => <Switch label="Auto expand" {...field} />}
          />
        </div>
        <Controller
          name="change_price" // Field name
          control={control}
          render={({ field: { ref, ...field } }) => (
            <RangeSliderInput
              {...field}
              onChange={v => field.onChange(v)}
              step={10}
              label={`Notify if rate changes by $${field.value}`}
              max={500}
              min={30}
            />
          )}
        />
        <div className="cursor-not-allowed">
          <div className="pointer-events-none bg-[#efeafa] border-2 border-dashed border-[#bc8bff] rounded-lg p-1">
            <Controller
              name="multi_tab" // Field name
              control={control}
              render={({ field }) => <Switch label="Multitab" {...field} />}
            />
            {/* <Controller
                name="auto_open_tab" // Field name
                control={control}
                render={({ field }) => <Switch label="Open highlighted tab" {...field} />}
              /> */}
            <Controller
              name="non_stop_refresh" // Field name
              control={control}
              render={({ field }) => <Switch className={'mb-0'} label="Non-Stop Refresh" {...field} />}
            />
          </div>
        </div>

        <div className="flex flex-1 justify-end">
          {!startApp ? (
            <Button
              onClick={() => {
                setStartApp(true);
              }}
              className="text-2xl py-2 bg-[#00688d]">
              <Play />
            </Button>
          ) : (
            <Button onClick={() => setStartApp(false)} className="text-2xl py-2 bg-gray-400">
              <Pause />
            </Button>
          )}
        </div>
      </form>
      <AutoBookCollaps />
    </div>
  );
};
