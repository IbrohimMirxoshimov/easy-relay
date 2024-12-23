import { SelectProps } from './type';

export function Radio(props: SelectProps) {
  return (
    <div>
      {props.options.map((o, i) => {
        return (
          <div
            className="flex items-center mb-1 cursor-pointer"
            key={i}
            onClick={() => {
              props.onChange?.(o.value);
            }}>
            <input
              type="radio"
              value={o.value}
              name="default-radio"
              className="w-4 h-4 text-[#00688d] bg-gray-100 border-gray-300"
              checked={o.value === props.value} />
            <label className="ms-2 text-sm font-medium text-gray-700">{o.label}</label>
          </div>
        );
      })}
    </div>
  );
}
