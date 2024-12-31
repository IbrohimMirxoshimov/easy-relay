import { cn } from '@extension/ui';
import { FieldProps } from './type';
import { forwardRef } from 'react';

export const Switch = forwardRef<HTMLInputElement, FieldProps<boolean>>(
  ({ value, onChange, className = 'mb-2', ...props }, ref) => {
    return (
      <div className={cn(className)}>
        <label className="flex items-center cursor-pointer justify-start">
          <input
            type="checkbox"
            checked={value}
            onChange={onChange}
            {...props}
            ref={ref} // Attach the forwarded ref here
            className="sr-only peer"
          />
          <div className="relative w-7 h-4 bg-gray-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-3 after:h-3 after:transition-all dark:border-gray-600 peer-checked:bg-[#00688d]"></div>
          <span className="text-sm font-medium text-gray-900 ml-1">{props.label}</span>
        </label>
      </div>
    );
  },
);
