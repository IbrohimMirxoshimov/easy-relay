import { Range } from 'react-range';
import { FieldProps } from './type';

export const RangeSliderInput: React.FC<
  { min: number; max: number; step: number; disabled?: boolean } & FieldProps<number[]>
> = props => {
  const values = props.value || [];
  return (
    <div className="flex flex-col">
      <div className="mb-2 text-sm font-semibold text-gray-700">{props.label}</div>
      <Range
        label="Select your value"
        step={props.step}
        min={props.min}
        max={props.max}
        disabled={props.disabled}
        values={values}
        onChange={values => props.onChange && props.onChange(values)}
        renderMark={({ props: p }) => (
          <div
            {...p}
            key={p.key}
            style={{
              ...p.style,
              height: '10px',
              width: '3px',
              // backgroundColor: index * props.step < values[0] ? '#548BF4' : '#ccc',
              backgroundColor: '#ccc',
            }}
          />
        )}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              width: '100%',
              backgroundColor: '#ccc',
            }}>
            {children}
          </div>
        )}
        renderThumb={({ index, props, isDragged }) => (
          <div
            {...props}
            key={props.key}
            style={{
              ...props.style,
              height: '22px',
              width: '22px',
              borderRadius: '4px',
              backgroundColor: '#FFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 2px 6px #AAA',
            }}>
            <div
              style={{
                position: 'absolute',
                bottom: '-24px',
                color: '#000',
                fontWeight: 'bold',
                fontSize: '14px',
                fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                padding: '0px 2px',
                borderRadius: '4px',
                backgroundColor: '#b6e3ff',
              }}>
              {values[index].toFixed(1)}
            </div>
            <div
              style={{
                height: '14px',
                width: '3px',
                backgroundColor: isDragged ? '#00688d' : '#CCC',
              }}
            />
          </div>
        )}
      />
      <div className="flex justify-between mt-2">
        <div>{props.min}</div>
        <div>{props.max}</div>
      </div>
    </div>
  );
};
