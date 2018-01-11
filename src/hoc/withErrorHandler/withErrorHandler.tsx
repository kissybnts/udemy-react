import * as React from 'react';
import { AxiosInstance } from 'axios';
import Modal from '../../components/UI/Modal/Modal';

interface State {
  error: any;
}

const withErrorHandler = (WrappedComponent: any, axios: AxiosInstance): any => {
  return class extends React.Component<{}, State> {
    state = {
      error: null
    };

    reqInterceptor: number;
    resInterceptor: number;

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });

      this.resInterceptor = axios.interceptors.response.use(req => req, error => {
        this.setState({ error: error });
        return error;
      });
    }

    componentWillUnmount() {
      // Clean up the interceptors
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    }

    render() {
      const error = this.state.error;

      return (
        <React.Fragment>
          <Modal
            show={this.state.error !== null}
            modalClosed={this.errorConfirmedHandler}
          >
            {error ? error['message'] : null}
          </Modal>
          <WrappedComponent {...this.props}/>
        </React.Fragment>
      );
    }
  };
};

export default withErrorHandler;