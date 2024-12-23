import { useState } from 'react';
import { InputNumber } from './InputNumber';
import { StrelkIco } from './StrelkIco';
import { Switch } from './Switch';

export function AutoBookCollaps(props: any) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col justify-center items-center">
      <div
        onClick={() => setOpen(!open)}
        style={{
          rotate: open ? '180deg' : undefined,
        }}
        className="bg-[#00688d] w-full h-6 flex justify-center items-center text-white">
        <StrelkIco />
      </div>

      {open && (
        <div className="mt-4">
          <Switch label="Auto book" />
          <div className="w-64">
            <div>Choose time difference from now (hours)</div>
            <div className="flex">
              <InputNumber label="Min" />
              <InputNumber label="Max" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
