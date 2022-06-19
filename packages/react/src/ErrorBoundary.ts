import { getCurrentHub } from "@booji/hub";
import {
  BrowserBreadcrumbCategory,
  BrowserBreadcrumbType,
  Event,
  Severity,
} from "@booji/types";
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

    const event: Event = {
      type: BrowserBreadcrumbType.Error,
      category: BrowserBreadcrumbCategory.CodeError,
      message: `${error.name}: ${error.message}`,
      level: Severity.Error,
      timestamp: Date.now(),
      stack: error.stack,
    };
    getCurrentHub().captureEvent(event);
  }

  render() {
    return (
      (this.state.error ? this.props.fallback : this.props.children) ?? null
    );
  }
}
