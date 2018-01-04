import * as React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Ingredients } from '../BurgerBuilder/BurgerBuilder';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import { BurgerBuilderState } from '../../store/reducers/burgerBuilder';

interface Props extends RouteComponentProps<{}> {
  ingredients: Ingredients;
  totalPrice: number;
}

class Checkout extends React.Component<Props, {}> {

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    if (this.props.ingredients === undefined) {
      return <Redirect to={'/'}/>
    }

    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route path={this.props.match.url + '/contact-data'} render={(props) => (<ContactData {...props} />) }  />
      </div>
    );
  }
}

const mapStateToProps = (state: BurgerBuilderState) => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice
});

export default connect(mapStateToProps)(Checkout);