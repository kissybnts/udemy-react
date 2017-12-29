import * as React from 'react';
import * as cssClasses from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import { RouteComponentProps } from 'react-router';
import { Ingredients } from '../../BurgerBuilder/BurgerBuilder';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input, { InputType, InputTypes } from '../../../components/UI/Input/Input';
import { FormEvent } from 'react';

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
  validation: ValidationRule;
  valid: boolean;
}

export interface ValidationRule {
  required?: boolean;
  maxLength?: number;
  minLength?: number;
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
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      email: {
        elementType: InputTypes.Input,
        elementConfig: {
          type: 'email',
          name: 'email',
          placeholder: 'Your E-Mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      country: {
        elementType: InputTypes.Input,
        elementConfig: {
          type: 'text',
          name: 'country',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      street: {
        elementType: InputTypes.Input,
        elementConfig: {
          type: 'text',
          name: 'street',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      zipCode: {
        elementType: InputTypes.Input,
        elementConfig: {
          type: 'text',
          name: 'zipCode',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false
      },
      deliveryMethod: {
        elementType: InputTypes.Select,
        elementConfig: {
          options: [
            { value: 'fastest', label: 'Fastest' },
            { value: 'cheapest', label: 'Cheapest' }
          ]
        },
        value: 'fastest',
        validation: { },
        valid: true
      }
    }
  };

  orderedHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData: { [key: string]: string } = {};

    Object.keys(this.state.form).forEach(formKey => {
      formData[formKey] = this.state.form[formKey].value;
    });

    const data = {
      ingredients: { ...this.props.ingredients },
      totalPrice: this.props.price,
      orderData: formData
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
    updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
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
      <form onSubmit={this.orderedHandler}>
        {inputs}
        <Button type={'Success'}>ORDER</Button>
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

  private checkValidity(value: string, rule: ValidationRule): boolean {
    let valid = true;

    if (rule.required && valid) {
      valid = value.trim() !== '';
    }

    if (rule.maxLength && valid) {
      valid = value.length <= rule.maxLength;
    }

    if (rule.minLength && valid) {
      valid = value.length >= rule.minLength;
    }

    return valid;
  }
}

export default ContactData;