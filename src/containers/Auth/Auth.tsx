import * as React from 'react';
import { FormElementInfo } from '../Checkout/ContactData/ContactData';
import Input, { InputTypes } from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { ChangeEvent } from 'react';

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
    const updatedForm = { ...this.state.form };
    const updatedFormElement: FormElementInfo = { ...updatedForm[event.target.name] };
    updatedFormElement.value = event.target.value;
    // TODO check validity
    updatedFormElement.isTouched = true;
    updatedForm[event.target.name] = updatedFormElement;
    // TODO check form elements validity
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
      <div>
        <form>
          {form}
          <Button type={'Success'}>Submit</Button>
        </form>
      </div>
    );
  }
}

export default Auth;