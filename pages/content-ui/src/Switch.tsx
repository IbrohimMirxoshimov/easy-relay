import { cn } from '@extension/ui';
import { FieldProps } from './type';

export function Switch({ value, onChange, className = 'mb-2', ...props }: FieldProps<boolean>) {
  return (
    <div className={cn(className)}>
      <label className="flex items-center cursor-pointer justify-start">
        <input type="checkbox" checked={value} onChange={onChange} {...props} className="sr-only peer" />
        <div className="relative w-7 h-4 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-3 after:h-3 after:transition-all dark:border-gray-600 peer-checked:bg-[#00688d]"></div>
        <span className="text-sm font-medium text-gray-900 ml-1">{props.label}</span>
      </label>
    </div>
  );
}
