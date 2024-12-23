import { SelectProps } from './type';

function Select(props: SelectProps) {
  return (
    <div className="mb-2 w-full">
      <label className="block mb-1 text-sm font-medium text-gray-900">{props.label}</label>
      <select
        onChange={props.onChange}
        value={props.value}
        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        {props.options.map(o => {
          return (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
