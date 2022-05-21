import { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  fallback?: ReactNode;
  onError?: (error: Error, componentStack: string) => void;
  children?: ReactNode;
}

interface ErrorBoundaryState {
  error: boolean;
}

/**
 * React ErrorBoundary Component
 * @public
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    error: false,
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const { onError } = this.props;
    if (onError && typeof onError === "function") {
      onError(error, errorInfo.componentStack);
    }

    this.setState({
      error: true,
    });
  }

  render() {
    return (
      (this.state.error ? this.props.fallback : this.props.children) ?? null
    );
  }
}
