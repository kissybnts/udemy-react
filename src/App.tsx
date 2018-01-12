import * as React from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { Action, Dispatch } from 'redux';
import { createAutomaticallyAuthAction } from './store/actions/auth';
import { connect } from 'react-redux';
import { ReduxState } from './index';

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
          <Route path={'/checkout'} component={Checkout}/>
          <Route path={'/orders'} component={Orders}/>
          <Route path={'/auth'} component={Auth}/>
          <Route path={'/logout'} component={Logout}/>
          <Route path={'/'} exact={true} component={BurgerBuilder}/>
          <Redirect to={'/'}/>
        </Switch>
      ) : (
        <Switch>
          <Route path={'/auth'} component={Auth}/>
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
