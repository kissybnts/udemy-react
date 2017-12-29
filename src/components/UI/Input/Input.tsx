import * as React from 'react';
import * as cssClasses from './Input.css';

export type InputType = 'input' | 'textarea' | 'select';

interface Props {
  inputType: InputType;
  label?: string;
  attributes: any;
  value: string;
  changed: (event?: any) => void;
  valid: boolean;
}

export namespace InputTypes {
  export const Input: InputType = 'input';
  export const Textarea: InputType = 'textarea';
  export const Select: InputType = 'select';
}

const input: React.SFC<Props> = props => {
  let inputElement = null;

  let classes = [cssClasses.InputElement];

  if (!props.valid) {
    classes.push(cssClasses.Invalid);
  }

  switch (props.inputType) {
    case InputTypes.Input:
      inputElement = <input className={classes.join(' ')} {...props.attributes} value={props.value} onChange={props.changed} />;
      break;
    case InputTypes.Textarea:
      inputElement = <textarea className={classes.join(' ')} {...props.attributes} value={props.value} onChange={props.changed} />;
      break;
    case InputTypes.Select:
      const options: { value: string, label: string }[] = props.attributes['options'];
      inputElement = (
        <select className={classes.join(' ')} name={props.label} id="" value={props.value} onChange={props.changed}>
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      );
      break;
    default:
      inputElement = <input className={classes.join(' ')} {...props.attributes} onChange={props.changed} />;
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