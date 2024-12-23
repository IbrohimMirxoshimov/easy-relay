import { FieldProps } from './type';


export function InputNumber(props: FieldProps<number>) {
  return (
    <div className="mx-1">
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
        value={props.value} />
    </div>
  );
}
