import { useStorage } from '@extension/shared';
import { mainStorage } from '@extension/storage';
import { useEffect } from 'react';

type FieldProps = {
  value: string;
  onChange: (e: any) => void;
  label: string;
};

type SelectProps = FieldProps & {
  options: {
    value: string;
    label: string;
  }[];
};

function getRefreshButton() {
  return document.querySelector<HTMLButtonElement>('#utility-bar div.refresh-and-chat-box button');
}

function isPageRefreshDisabled() {
  const el = document.querySelector<HTMLParagraphElement>(
    '#utility-bar > div > div > div.refresh-and-chat-box > div > div.css-1vq46oc > div > p',
  );

  return el?.textContent === 'Turn on auto refresh';
}

function clickRefreshButton() {
  if (!isPageRefreshDisabled()) return;

  const btn = getRefreshButton();

  if (btn) {
    btn.click();
  }
}

function getFirstItem() {
  return document.querySelector<HTMLDivElement>(
    '#active-tab-body > div > div > div > div > div.load-list > div:nth-child(1)',
  );
}

function addPadding() {
  const firstItem = getFirstItem();

  if (!firstItem) {
    return;
  }

  firstItem.style.paddingBottom = '200px';

  // @ts-ignore
  setTimeout(() => firstItem.firstChild?.click(), 500);
}

const ref = { no: true };

function watchDom(onAppear: () => void) {
  const i = setInterval(() => {
    if (ref.no) {
      if (getFirstItem()) {
        onAppear();
        ref.no = false;
      }
    } else {
      if (!getFirstItem()) {
        ref.no = true;
      }
    }
  }, 300);

  return () => clearInterval(i);
}

export default function App() {
  const main = useStorage(mainStorage);

  useEffect(() => {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      console.log('Fetch called with:', args);
      const response = await originalFetch(...args);
      console.log('Response received:', response);
      return response;
    };

    function onAppear() {
      console.log('appered', 1);
      addPadding();
    }
    return watchDom(onAppear);
  }, []);

  useEffect(() => {
    if (!isPageRefreshDisabled()) return;
    function setrefresh() {
      return setInterval(() => {
        console.log('refresh every: ' + main.interval);
        clickRefreshButton();
      }, 1000 * main.interval);
    }

    const start = main.auto_refresh ? setrefresh() : 0;

    return () => clearInterval(start);
  }, [main.interval, main.auto_refresh]);

  return (
    <div className="flex shadow-xl border gap-2 rounded-lg bg-slate-50 fixed left-1/2 -translate-x-1/2 bottom-0 z-[1001] p-3 pb-1">
      <div className="flex  flex-col items-start">
        <Switch
          checked={main.auto_refresh}
          label="Auto refresh"
          onChange={e => {
            if (!isPageRefreshDisabled()) {
              return;
            }
            mainStorage.update({
              auto_refresh: e.target.checked,
            });
          }}
        />
        <Select
          label="Interval"
          onChange={e => {
            console.log(e);
            mainStorage.update({
              interval: e.target.value,
            });
          }}
          options={[
            {
              label: '10s',
              value: '10',
            },
            {
              label: '6s',
              value: '6',
            },
            {
              label: '5s',
              value: '5',
            },
            {
              label: '4s',
              value: '4',
            },
            {
              label: '3s',
              value: '3',
            },
          ]}
          value={String(main.interval)}
        />
      </div>
      <div className="flex flex-col items-start ml-4">
        <Switch
          checked={main.open_info_bottom}
          label="Open bottom"
          onChange={e => {
            if (!isPageRefreshDisabled()) {
              return;
            }
            mainStorage.update({
              open_info_bottom: e.target.checked,
            });
          }}
        />
        <InputNumber
          value={String(main.top_increase_price)}
          label="To top price"
          onChange={e => {
            if (!isPageRefreshDisabled()) {
              return;
            }
            mainStorage.update({
              top_increase_price: Number(e.target.value),
            });
          }}
        />
      </div>
      <div className="flex flex-col items-start ml-4 justify-start">
        <Switch
          checked={main.auto_book}
          label="Auto book"
          onChange={e => {
            if (!isPageRefreshDisabled()) {
              return;
            }
            mainStorage.update({
              auto_book: e.target.checked,
            });
          }}
        />
      </div>
    </div>
  );
}

function InputNumber(props: FieldProps) {
  return (
    <div className="max-w-sm mx-auto w-24">
      <label htmlFor="number-input" className="block mb-1 text-sm font-medium text-gray-900 ">
        {props.label}
      </label>
      <input
        type="number"
        onChange={props.onChange}
        id="number-input"
        aria-describedby="helper-text-explanation"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        placeholder="90210"
        value={props.value}
      />
    </div>
  );
}

function Select(props: SelectProps) {
  return (
    <div className="mb-2 w-full">
      <label htmlFor="countries" className="block mb-1 text-sm font-medium text-gray-900">
        {props.label}
      </label>
      <select
        onChange={props.onChange}
        id="countries"
        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        {props.options.map(o => {
          return (
            <option key={o.value} selected={o.value === props.value} value={o.value}>
              {o.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

function Switch(props: { label: string; checked: boolean; onChange: (e: any) => void }) {
  return (
    <div className="mb-4">
      <label className="flex-col flex items-start cursor-pointer justify-start">
        <span className="text-sm font-medium text-gray-900 mb-1">{props.label}</span>
        <input type="checkbox" checked={props.checked} onChange={props.onChange} className="sr-only peer" />
        <div className="relative w-11 h-6 bg-gray-200  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
}
