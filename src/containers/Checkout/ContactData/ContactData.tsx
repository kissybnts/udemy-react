import * as React from 'react';
import * as cssClasses from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import { RouteComponentProps } from 'react-router';
import { Ingredients } from '../../BurgerBuilder/BurgerBuilder';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input, { InputType, InputTypes } from '../../../components/UI/Input/Input';
import { ChangeEvent, FormEvent } from 'react';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { createPurchaseRequestAction } from '../../../store/actions';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { OrderData } from '../../Orders/Orders';
import { ReduxState } from '../../../index';
import { checkValidity, updateObject } from '../../../shared/utility';

interface Props extends RouteComponentProps<{}> {
  ingredients: Ingredients;
  totalPrice: number;
  loading: boolean;
  token: string;
  userId: string;
  onOrderBurger: (orderData: any, token: string) => void;
}

interface State {
  form: Form;
  formIsValid: boolean;
}

interface Form {
    name: FormElementInfo;
    email: FormElementInfo;
    country: FormElementInfo;
    street: FormElementInfo;
    zipCode: FormElementInfo;
    deliveryMethod: FormElementInfo;
}

export interface FormElementInfo {
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
  isEmail?: boolean;
}

class ContactData extends React.Component<Props, State> {
  state = {
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
          required: true,
          isEmail: true,
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

    const data: OrderData = {
      ingredients: { ...this.props.ingredients },
      totalPrice: +this.props.totalPrice.toFixed(2),
      customer: {
        address: {
          postalCode: formData['zipCode'],
          street: formData['street']
        },
        email: formData['email'],
        name: formData['name']
      },
      deliveryMethod: formData['deliveryMethod'],
      userId: this.props.userId,
    };

    this.props.onOrderBurger(data, this.props.token);
  }

  inputChangedHandler = (event: ChangeEvent<HTMLInputElement>, identifier: string) => {
    const updatedForm: Form = updateObject(this.state.form, {
      [identifier]: updateObject(this.state.form[identifier], {
        value: event.target.value,
        isValid: checkValidity(event.target.value, this.state.form[identifier].validation),
        isTouched: true,
      }),
    });
    const formIsValid = this.checkFormValidity(updatedForm);
    this.setState({ form: updatedForm, formIsValid: formIsValid });
  }

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

    if (this.props.loading) {
      form = <Spinner/>;
    }

    return (
      <div className={cssClasses.ContactData}>
        {form}
      </div>
    );
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

const mapStateToProps = (state: ReduxState) => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.idToken,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onOrderBurger: (orderData: any, token: string) => dispatch(createPurchaseRequestAction(orderData, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));