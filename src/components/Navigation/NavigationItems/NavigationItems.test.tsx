import * as React from 'react';
import { configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({
  adapter: new Adapter(),
});

describe('<NavigationItems />', () => {
  it('should render two <NavigationItem/> elements if not authenticated', () => {
    const wrapper = shallow(<NavigationItems isAuthenticated={false} />);
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
});
