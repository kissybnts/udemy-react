import * as React from 'react';
import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({
  adapter: new Adapter()
});

describe('<BurgerBuilder/>', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    const a: any = {};
    wrapper = shallow(<BurgerBuilder
      totalPrice={4}
      error={false}
      isAuthenticated={false}
      onIngredientAdded={() => {}}
      onIngredientRemoved={() => {}}
      requestFetchingIngredients={() => {}}
      onInitPurchase={() => {}}
      onSetAuthRedirectPath={() => {}}
      match={a}
      location={a}
      history={a}/>)
  });

  it('should render <BuildControls/> if ingredients are set', () => {
    wrapper.setProps({ ingredients: { Salad: 1, Bacon: 1, Meet: 1, Cheese: 1 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});