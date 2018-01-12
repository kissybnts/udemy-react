import * as React from 'react';

interface State {
  component: any;
}

const asyncComponent = (importComponent: () => Promise<any>): any => {
  return class extends React.Component<any, State> {
    state: State = {
      component: null
    };

    componentDidMount() {
      importComponent()
        .then(cmp => {
          this.setState({ component: cmp.default });
        });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent;