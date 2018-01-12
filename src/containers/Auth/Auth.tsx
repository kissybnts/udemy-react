import * as React from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { FormElementInfo } from '../Checkout/ContactData/ContactData';
import Input, { InputTypes } from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as cssClasses from './Auth.css';
import { Redirect, RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { AuthAction, createAuthRequestAction, createSetAuthRedirectPathAction } from '../../store/actions/auth';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { ReduxState } from '../../index';
import { checkValidity, updateObject } from '../../shared/utility';

interface Props extends RouteComponentProps<{}> {
  loading: boolean;
  error: any;
  isAuthenticated: boolean;
  burgerIsBuilding: boolean;
  redirectPath: string;
  onAuth: (email: string, password: string, isSignUp: boolean) => void;
  onResetAuthRedirectPath: () => void;
}

interface State {
  form: FormElements;
  isSignUp: boolean;
}

interface FormElements {
  email: FormElementInfo;
  password: FormElementInfo;
}

class Auth extends React.Component<Props, State> {
  state: State = {
    form: {
      email: {
        elementType: InputTypes.Input,
        elementConfig: {
          type: 'email',
          name: 'email',
          placeholder: 'Email Address'
        },
        value: '',
        validation: {
          isEmail: true,
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
          minLength: 8,
        },
        isValid: false,
        isTouched: false
      },
    },
    isSignUp: true,
  };

  componentDidMount() {
    if (!this.props.burgerIsBuilding && this.props.redirectPath !== '/') {
      this.props.onResetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const updatedForm: FormElements = updateObject(this.state.form, {
      [name]: updateObject(this.state.form[name], {
        value: event.target.value,
        isValid: checkValidity(event.target.value, this.state.form[name].validation),
        isTouched: true,
      }),
    });

    this.setState({ form: updatedForm });
  }

  authRequestHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onAuth(this.state.form.email.value, this.state.form.password.value, this.state.isSignUp);
  }

  switchModeHandler = () => {
    this.setState(prev => {
      return {
        isSignUp: !prev.isSignUp
      };
    });
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to={this.props.redirectPath}/>;
    }

    if (this.props.loading) {
      return (<Spinner/>);
    }

    const form = Object.keys(this.state.form).map(key => {
      const info: FormElementInfo = this.state.form[key];
      return (
        <Input
          key={key}
          inputType={info.elementType}
          attributes={info.elementConfig}
          value={info.value}
          changed={(event) => this.inputChangedHandler(event)}
          isValid={info.isValid}
          isTouched={info.isTouched}
        />
      );
    });

    const error = this.props.error ? <p className={cssClasses.Error}>ERROR: {this.props.error}</p> : null;

    return (
      <div className={cssClasses.Auth}>
        {error}
        <form onSubmit={this.authRequestHandler}>
          {form}
          <Button type={'Success'}>Submit</Button>
        </form>
        <Button
          type={'Danger'}
          clicked={this.switchModeHandler}
        >
          Switch to {this.state.isSignUp ? 'Sign in' : 'Sign up'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.idToken !== undefined,
  burgerIsBuilding: state.burgerBuilder.isBuilding,
  redirectPath: state.auth.redirectPath,
});

const mapDispatchToProps = (dispatch: Dispatch<AuthAction>) => ({
  onAuth: (email: string, password: string, isSignUp: boolean) => {
    dispatch(createAuthRequestAction(email, password, isSignUp));
  },
  onResetAuthRedirectPath: () => { dispatch(createSetAuthRedirectPathAction('/')); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);