import * as React from 'react';
import * as cssClasses from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import { RouteComponentProps } from 'react-router';
import { Ingredients } from '../../BurgerBuilder/BurgerBuilder';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input, { InputType, InputTypes } from '../../../components/UI/Input/Input';

interface Props extends RouteComponentProps<{}> {
  ingredients: Ingredients;
  price: number;
}

interface State {
  loading: boolean;
  form: {
    name: ElementInfo;
    email: ElementInfo;
    country: ElementInfo;
    street: ElementInfo;
    zipCode: ElementInfo;
    deliveryMethod: ElementInfo;
  }
}

interface ElementInfo {
  elementType: InputType;
  elementConfig: any;
  value: string;
}

class ContactData extends React.Component<Props, State> {
  state = {
    loading: false,
    form: {
      name: {
        elementType: InputTypes.Input,
        elementConfig: {
          type: 'text',
          name: 'name',
          placeholder: 'Your Name'
        },
        value: ''
      },
      email: {
        elementType: InputTypes.Input,
        elementConfig: {
          type: 'email',
          name: 'email',
          placeholder: 'Your E-Mail'
        },
        value: ''
      },
      country: {
        elementType: InputTypes.Input,
        elementConfig: {
          type: 'text',
          name: 'country',
          placeholder: 'Country'
        },
        value: ''
      },
      street: {
        elementType: InputTypes.Input,
        elementConfig: {
          type: 'text',
          name: 'street',
          placeholder: 'Street'
        },
        value: ''
      },
      zipCode: {
        elementType: InputTypes.Input,
        elementConfig: {
          type: 'text',
          name: 'zipCode',
          placeholder: 'ZIP Code'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: InputTypes.Select,
        elementConfig: {
          options: [
            { value: 'fastest', label: 'Fastest' },
            { value: 'cheapest', label: 'Cheapest' }
          ]
        },
        value: 'fastest'
      }
    }
  };

  orderedHandler = (event: MouseEvent) => {
    event.preventDefault();
    const data = {
      ingredients: { ...this.props.ingredients },
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

  inputChangedHandler = (event: Event, identifier: string) => {
    const updatedForm = { ...this.state.form };
    const updatedElement: ElementInfo = { ...updatedForm[identifier] };
    updatedElement.value = event.target['value'];
    updatedForm[identifier] = updatedElement;
    this.setState({ form: updatedForm });
  };

  render () {
    const inputs = Object.keys(this.state.form)
      .map(key => (
        <Input
          key={key}
          inputType={this.state.form[key].elementType}
          attributes={this.state.form[key].elementConfig}
          value={this.state.form[key].value}
          changed={(event) => this.inputChangedHandler(event, key)}
        />
      ));

    let form = (
      <form>
        {inputs}
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