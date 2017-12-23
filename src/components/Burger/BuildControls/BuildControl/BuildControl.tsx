import * as React from 'react';
import * as cssClasses from './BuildControl.css';

interface Props {
  label: string;
  added: () => void;
  removed: () => void;
  disabled: boolean;
}

const buildControl: React.SFC<Props> = props => (
  <div className={cssClasses.BuildControl}>
    <div className={cssClasses.Label}>{props.label}</div>
    <button className={cssClasses.Less} onClick={props.removed} disabled={props.disabled}>Less</button>
    <button className={cssClasses.More} onClick={props.added}>More</button>
  </div>
);

export default buildControl;