import * as React from 'react';
import * as cssClasses from './NavigationItem.css';

interface Props {
    link: string;
    active: boolean;
}

const navigationItem: React.SFC<Props> = props => (
    <li className={cssClasses.NavigationItem}>
        <a href={props.link} className={props.active ? cssClasses.Active : ''}>{props.children}</a>
    </li>
);

export default navigationItem;