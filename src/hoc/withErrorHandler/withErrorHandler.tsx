import * as React from 'react';
import { AxiosInstance } from 'axios';
import Modal from '../../components/UI/Modal/Modal';

interface State {
  error?: any;
}

const withErrorHandler = (WrappedComponent: any, axios: AxiosInstance) => {
  return class extends React.Component<{}, State> {
    state = {
      error: null
    };

    componentDidMount() {
      axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      }, error => error);

      axios.interceptors.response.use(req => req, error => {
        this.setState({ error: error });
      });
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      const error = this.state.error;

      return (
        <React.Fragment>
          <Modal
            show={this.state.error !== null}
            modalClosed={this.errorConfirmedHandler}
          >{error ? error['message'] : null}</Modal>
          <WrappedComponent {...this.props}/>
        </React.Fragment>
      );
    }
  }
};

export default withErrorHandler;