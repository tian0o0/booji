import { getCurrentHub } from "@booji/hub";
import { IncomingMessage, ServerResponse } from "http";

/**
 * MiddlewareError
 * @internal
 */
interface MiddlewareError extends Error {
  status?: number | string;
  statusCode?: number | string;
  status_code?: number | string;
  output?: {
    statusCode?: number | string;
  };
}

/**
 * Express Error Handler Middleware
 * @public
 */
export function ErrorHandler(
  error: MiddlewareError,
  req: IncomingMessage,
  res: ServerResponse,
  next: (error: MiddlewareError) => void
): void {
  getCurrentHub().captureException(error);
  next(error);
}
