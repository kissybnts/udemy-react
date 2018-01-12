import * as React from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { Action, Dispatch } from 'redux';
import { createAutomaticallyAuthAction } from './store/actions/auth';
import { connect } from 'react-redux';

interface Props extends RouteComponentProps<{}> {
  onTryAutomaticallyLogin: () => void;
}

class App extends React.Component<Props> {
  componentDidMount() {
    this.props.onTryAutomaticallyLogin();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path={'/checkout'} component={Checkout}/>
            <Route path={'/orders'} component={Orders}/>
            <Route path={'/auth'} component={Auth}/>
            <Route path={'/logout'} component={Logout}/>
            <Route path={'/'} exact={true} component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onTryAutomaticallyLogin: () => { dispatch(createAutomaticallyAuthAction()); },
});

export default withRouter(connect(null, mapDispatchToProps)(App));
