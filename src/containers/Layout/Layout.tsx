import * as React from 'react';
import * as cssClasses from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { ReduxState } from '../../index';
import { connect } from 'react-redux';

interface Props {
  isAuthenticated: boolean;
}

interface State {
  showSideDrawer: boolean;
}

class Layout extends React.Component<Props, State> {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  }

  sideDrawerToggleHandler = () => {
    this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));
  }

  render() {
    return (
      <React.Fragment>
        <Toolbar
          isAuthenticated={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuthenticated={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={cssClasses.Content}>
          {this.props.children}
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: ReduxState)  => ({
  isAuthenticated: state.auth.idToken !== undefined,
});

export default connect(mapStateToProps)(Layout);