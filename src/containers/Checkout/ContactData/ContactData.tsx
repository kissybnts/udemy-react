import * as React from 'react';
import * as cssClasses from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import { RouteComponentProps } from 'react-router';
import { Ingredients } from '../../BurgerBuilder/BurgerBuilder';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input, { InputType, InputTypes } from '../../../components/UI/Input/Input';
import { FormEvent } from 'react';
import { connect } from 'react-redux';
import { BurgerBuilderState } from '../../../store/reducer';

interface Props extends RouteComponentProps<{}> {
  ingredients: Ingredients;
  totalPrice: number;
}

interface State {
  loading: boolean;
  form: Form;
  formIsValid: boolean;
}

interface Form {
    name: ElementInfo;
    email: ElementInfo;
    country: ElementInfo;
    street: ElementInfo;
    zipCode: ElementInfo;
    deliveryMethod: ElementInfo;
}

interface ElementInfo {
  elementType: InputType;
  elementConfig: any;
  value: string;
  validation: ValidationRule;
  isValid: boolean;
  isTouched: boolean;
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
        isValid: false,
        isTouched: false
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
        isValid: false,
        isTouched: false
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
        isValid: false,
        isTouched: false
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
        isValid: false,
        isTouched: false
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
        isValid: false,
        isTouched: false
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
        isValid: true,
        isTouched: false
      }
    },
    formIsValid: false
  };

  orderedHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData: { [key: string]: string } = {};

    Object.keys(this.state.form).forEach(formKey => {
      formData[formKey] = this.state.form[formKey].value;
    });

    const data = {
      ingredients: { ...this.props.ingredients },
      totalPrice: this.props.totalPrice.toFixed(2),
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
    updatedElement.isValid = this.checkValidity(updatedElement.value, updatedElement.validation);
    updatedElement.isTouched = true;
    updatedForm[identifier] = updatedElement;
    const formIsValid = this.checkFormValidity(updatedForm);
    this.setState({ form: updatedForm, formIsValid: formIsValid });
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
          isValid={this.state.form[key].isValid}
          isTouched={this.state.form[key].isTouched}
        />
      ));

    let form = (
      <form onSubmit={this.orderedHandler}>
        {inputs}
        <Button type={'Success'} disabled={!this.state.formIsValid}>ORDER</Button>
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
    let isValid = true;

    if (rule.required && isValid) {
      isValid = value.trim() !== '';
    }

    if (rule.maxLength && isValid) {
      isValid = value.length <= rule.maxLength;
    }

    if (rule.minLength && isValid) {
      isValid = value.length >= rule.minLength;
    }

    return isValid;
  }

  private checkFormValidity(updatedForm: Form): boolean {
    const keys = Object.keys(updatedForm);
    for (let key of keys) {
      if (!updatedForm[key].isValid) {
        return false;
      }
    }

    return true;
  }
}

const mapStateToProps = (state: BurgerBuilderState) => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice
});

export default connect(mapStateToProps)(ContactData);