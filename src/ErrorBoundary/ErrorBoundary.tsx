import * as React from 'react';
import { ErrorInfo } from 'react';

class ErrorBoundary extends React.Component<{}, { hasError: boolean, errorMessage: string}> {
  constructor(props: {}) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: ''
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      hasError: true,
      errorMessage: error.message
    });
  }

  render() {
    if (this.state.hasError) {
      return <h1>{this.state.errorMessage}</h1>
    } else {
      return this.props.children
    }
  }
}

export default ErrorBoundary;