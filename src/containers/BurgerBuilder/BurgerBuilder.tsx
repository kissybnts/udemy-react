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
import { BurgerBuilderState } from '../../store/reducer';
import { Action, Dispatch } from 'redux';
import { createAddIngredientAction, createRemoveIngredientAction } from '../../store/actions';


interface Props extends RouteComponentProps<{}> {
  ingredients?: Ingredients;
  totalPrice: number;
  onIngredientAdded: (ingKey: string) => void;
  onIngredientRemoved: (ingKey: string) => void;
}

interface State {
  purchasable: boolean;
  purchasing: boolean;
  loading: boolean;
  error: boolean;
}

export interface Ingredients {
  Meat: number;
  Cheese: number;
  Bacon: number;
  Salad: number;
}

class BurgerBuilder extends React.Component<Props, State> {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    // axios.get('/ingredients.json')
    //   .then(req => {
    //     this.setState({ ingredients: { ...req.data }});
    //   }).catch(error => {
    //     this.setState({ error: true })
    //   });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const ingredients = this.props.ingredients;
    if (ingredients !== undefined) {
      const queryParams: string[] = [];
      for (let i in ingredients) {
        queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(ingredients[i]));
      }
      queryParams.push('price=' + this.props.totalPrice);
      const queryString = queryParams.join('&');
      this.props.history.push({
        pathname: '/checkout',
        search: '?' + queryString
      });
    }
  };

  render() {
    const ingredients = this.props.ingredients;

    let burger = this.state.error ? <p>Ingredients can't load!</p> : <Spinner/>;
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
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </React.Fragment>
      );

      orderSummary = <OrderSummary
        ingredients={ingredients}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.props.totalPrice}
      />;
    }

    if (this.state.loading) {
      orderSummary = <Spinner/>
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

  // private updatePurchasable(ingredients: Ingredients) {
  //   const sum = Object.keys(ingredients)
  //     .map(key => ingredients[key])
  //     .reduce((total, elem) => total + elem, 0);
  //   this.setState({ purchasable: sum > 0 });
  // }
}

const mapStateToProps = (state: BurgerBuilderState) => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onIngredientAdded: (ingKey: string) => dispatch(createAddIngredientAction(ingKey)),
  onIngredientRemoved: (ingKey: string) => dispatch(createRemoveIngredientAction(ingKey))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));