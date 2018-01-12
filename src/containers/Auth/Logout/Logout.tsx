import * as React from 'react';
import { Redirect } from 'react-router';
import { Action, Dispatch } from 'redux';
import { createAuthLogoutAction } from '../../../store/actions/auth';
import { connect } from 'react-redux';

interface Props {
  onLogout: () => void;
}

class Logout extends React.Component<Props> {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to={'/'}/>;
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onLogout: () => { dispatch(createAuthLogoutAction()); },
});

export default connect(null, mapDispatchToProps)(Logout);