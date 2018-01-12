import * as React from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router';
import Logout from './containers/Auth/Logout/Logout';
import { Action, Dispatch } from 'redux';
import { createAutomaticallyAuthAction } from './store/actions/auth';
import { connect } from 'react-redux';
import { ReduxState } from './index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));
const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'));
const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));

interface Props extends RouteComponentProps<{}> {
  isAuthenticated: boolean;
  onTryAutomaticallyLogin: () => void;
}

class App extends React.Component<Props> {
  componentDidMount() {
    this.props.onTryAutomaticallyLogin();
  }

  render() {
    const routes = this.props.isAuthenticated
      ? (
        <Switch>
          <Route path={'/checkout'} component={asyncCheckout}/>
          <Route path={'/orders'} component={asyncOrders}/>
          <Route path={'/auth'} component={asyncAuth}/>
          <Route path={'/logout'} component={Logout}/>
          <Route path={'/'} exact={true} component={BurgerBuilder}/>
          <Redirect to={'/'}/>
        </Switch>
      ) : (
        <Switch>
          <Route path={'/auth'} component={asyncAuth}/>
          <Route path={'/'} exact={true} component={BurgerBuilder}/>
          <Redirect to={'/'}/>
        </Switch>
      );

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  isAuthenticated: state.auth.idToken !== undefined,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onTryAutomaticallyLogin: () => { dispatch(createAutomaticallyAuthAction()); },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
