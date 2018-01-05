import * as React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Ingredients } from '../BurgerBuilder/BurgerBuilder';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import { ReduxState } from '../../index';

interface Props extends RouteComponentProps<{}> {
  ingredients: Ingredients;
  totalPrice: number;
  purchased: boolean;
}

class Checkout extends React.Component<Props, {}> {

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    if (this.props.ingredients === undefined || this.props.purchased) {
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

const mapStateToProps = (state: ReduxState) => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  purchased: state.order.purchased,
});

export default connect(mapStateToProps)(Checkout);