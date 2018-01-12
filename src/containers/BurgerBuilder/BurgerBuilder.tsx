import * as React from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import {
  createAddIngredientAction,
  createFetchIngredientsAction,
  createPurchaseInitAction,
  createRemoveIngredientAction
} from '../../store/actions/index';
import { ReduxState } from '../../index';
import { createSetAuthRedirectPathAction } from '../../store/actions/auth';

interface Props extends RouteComponentProps<{}> {
  ingredients?: Ingredients;
  totalPrice: number;
  error: boolean;
  isAuthenticated: boolean;
  onIngredientAdded: (ingKey: string) => void;
  onIngredientRemoved: (ingKey: string) => void;
  requestFetchingIngredients: () => void;
  onInitPurchase: () => void;
  onSetAuthRedirectPath: (path: string) => void;
}

interface State {
  purchasing: boolean;
}

export interface Ingredients {
  Salad: number;
  Bacon: number;
  Cheese: number;
  Meat: number;
}

class BurgerBuilder extends React.Component<Props, State> {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.requestFetchingIngredients();
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  render() {
    const ingredients = this.props.ingredients;

    let burger = this.props.error ? <p>Ingredients can't load!</p> : <Spinner/>;
    let orderSummary = null;

    if (ingredients !== undefined) {
      let disabledInfo: { [key: string]: boolean } = {};
      Object.keys(ingredients).forEach((key) => {
        const ing = ingredients;
        if (ing !== undefined) {
          disabledInfo[key] = ing[key] <= 0;
        }
      });

      burger = (
        <React.Fragment>
          <Burger ingredients={ingredients}/>
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabledInfo={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.canPurchase()}
            ordered={this.purchaseHandler}
            isAuthenticated={this.props.isAuthenticated}
          />
        </React.Fragment>
      );

      orderSummary = (
        <OrderSummary
          ingredients={ingredients}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.totalPrice}
        />
      );
    }

    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }

  private canPurchase = (): boolean => {
    const ingredients = this.props.ingredients;
    if (ingredients) {
      const sum = Object.keys(ingredients)
        .map(key => ingredients[key])
        .reduce((total, elem) => total + elem, 0);
      return sum > 0;
    }
    return false;
  }
}

const mapStateToProps = (state: ReduxState) => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
  isAuthenticated: state.auth.idToken !== undefined,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onIngredientAdded: (ingKey: string) => dispatch(createAddIngredientAction(ingKey)),
  onIngredientRemoved: (ingKey: string) => dispatch(createRemoveIngredientAction(ingKey)),
  requestFetchingIngredients: () => dispatch(createFetchIngredientsAction()),
  onInitPurchase: () => dispatch(createPurchaseInitAction()),
  onSetAuthRedirectPath: (path: string) => dispatch(createSetAuthRedirectPathAction(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));