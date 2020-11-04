// Core
import * as React from 'react';

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = { hasError: false };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    return !this.state.hasError ? this.props.children : <p>Ошибка!</p>;
  }
}

// Exports
export default ErrorBoundary;
