import * as React from 'react';
import * as cssClasses from './Input.css';

export type InputType = 'input' | 'textarea' | 'select';

interface Props {
  inputType: InputType;
  label?: string;
  attributes: any;
  value: string;
}

export namespace InputTypes {
  export const Input: InputType = 'input';
  export const Textarea: InputType = 'textarea';
  export const Select: InputType = 'select';
}

const input: React.SFC<Props> = props => {
  let inputElement = null;

  switch (props.inputType) {
    case InputTypes.Input:
      inputElement = <input className={cssClasses.InputElement} {...props.attributes} value={props.value} />;
      break;
    case InputTypes.Textarea:
      inputElement = <textarea className={cssClasses.InputElement} {...props.attributes} value={props.value} />;
      break;
    case InputTypes.Select:
      const options: { value: string, label: string }[] = props.attributes['options'];
      inputElement = (
        <select className={cssClasses.InputElement} name={props.label} id="" value={props.value}>
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      );
      break;
    default:
      inputElement = <input className={cssClasses.InputElement} {...props.attributes} />;
      break;
  }

  return (
    <div className={cssClasses.Input}>
      {props.label ? <label className={cssClasses.Label} htmlFor="">{props.label}</label> : null}
      {inputElement}
    </div>
  );
};

export default input;