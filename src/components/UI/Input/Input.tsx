import * as React from 'react';
import * as cssClasses from './Input.css';

type InputType = 'input' | 'textarea';

interface Props {
  inputType: InputType;
  label: string;
  attributes: any;
}

const input: React.SFC<Props> = props => {
  let inputElement = null;

  switch (props.inputType) {
    case 'input':
      inputElement = <input className={cssClasses.InputElement} {...props.attributes} />;
      break;
    case 'textarea':
      inputElement = <textarea className={cssClasses.InputElement} {...props.attributes} />;
      break;
    default:
      inputElement = <input className={cssClasses.InputElement} {...props.attributes} />;
      break;
  }

  return (
    <div className={cssClasses.Input}>
      <label className={cssClasses.Label} htmlFor="">{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;