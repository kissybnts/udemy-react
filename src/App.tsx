import * as React from 'react';
import './App.css';
import { ChangeEvent } from 'react';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

const logo = require('./logo.svg');

class App extends React.Component<{}, { userName: string }> {
  constructor(props: {}) {
    super(props);
    this.state = { userName: 'initial user name' };
  }

  userNameChangedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ userName: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <UserOutput userName={this.state.userName}/>
        <UserInput userName={this.state.userName} change={this.userNameChangedHandler} />
      </div>
    );
  }
}

export default App;
