import * as React from 'react';
import * as cssClasses from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import { RouteComponentProps } from 'react-router';
import { Ingredients } from '../../BurgerBuilder/BurgerBuilder';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

interface Props extends RouteComponentProps<{}> {
  ingredients: Ingredients;
  price: number;
}

interface State {
  loading: boolean;
  name: string;
  email: string;
  address: {
    street: string;
    postalCode: string;
  }
}

class ContactData extends React.Component<Props, State> {
  state = {
    loading: false,
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  };

  orderedHandler = (event: MouseEvent) => {
    event.preventDefault();
    const data = {
      ingredients: { ...this.props.ingredients },
      customer: {
        address: { ...this.state.address },
        name: this.state.name,
        email: this.state.email
      },
      deliveryMethod: 'shortest',
      totalPrice: this.props.price
    };
    axios.post('/orders.json', data)
      .then(response => {
        this.props.history.push('/');
      }).catch(error => {
        console.log(error);
      });
  };

  render () {
    let form = (
      <form>
        <input className={cssClasses.Input} type="text" name="name" placeholder="Your Name"/>
        <input className={cssClasses.Input} type="email" name="email" placeholder="Your Email"/>
        <input className={cssClasses.Input} type="text" name="street" placeholder="Street"/>
        <input className={cssClasses.Input} type="text" name="postalCode" placeholder="Postal Code"/>
        <Button clicked={this.orderedHandler} type={'Success'}>ORDER</Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner/>
    }

    return (
      <div className={cssClasses.ContactData}>
        {form}
      </div>
    );
  }
}

export default ContactData;