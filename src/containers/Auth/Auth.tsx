import * as React from 'react';
import { FormElementInfo, ValidationRule } from '../Checkout/ContactData/ContactData';
import Input, { InputTypes } from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { ChangeEvent } from 'react';
import * as cssClasses from './Auth.css';

interface State {
  form: FormElements;
}

interface FormElements {
  email: FormElementInfo;
  password: FormElementInfo;
}

class Auth extends React.Component<{}, State> {
  state: State = {
    form: {
      email: {
        elementType: InputTypes.Input,
        elementConfig: {
          type: 'email',
          nam: 'email',
          placeholder: 'Email Address'
        },
        value: '',
        validation: {
          required: true
        },
        isValid: false,
        isTouched: false
      },
      password: {
        elementType: InputTypes.Input,
        elementConfig: {
          type: 'password',
          name: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 8
        },
        isValid: false,
        isTouched: false
      },
    },
  }

  handleChangedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const updatedForm = {
      ...this.state.form,
      [name]: {
        ...this.state.form[name],
        value: event.target.value,
        isValid: this.checkValidity(event.target.value, this.state.form[name].validation),
        isTouched: true,
      }
    };

    this.setState({ form: updatedForm });
  }

  render() {
    const form = Object.keys(this.state.form).map(key => {
      const info: FormElementInfo = this.state.form[key];
      return (
        <Input
          key={key}
          inputType={info.elementType}
          attributes={info.elementConfig}
          value={info.value}
          changed={(event) => this.handleChangedHandler(event)}
          isValid={info.isValid}
          isTouched={info.isTouched}
        />
      );
    });

    return (
      <div className={cssClasses.Auth}>
        <form>
          {form}
          <Button type={'Success'}>Submit</Button>
        </form>
      </div>
    );
  }

  // TODO extract as common method
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
}

export default Auth;