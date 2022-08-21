import { getCurrentHub } from "@booji/hub";
import {
  BreadcrumbCategory,
  BreadcrumbType,
  Event,
  Severity,
  ViewModel,
  Vue,
} from "@booji/types";
import { formatComponentName } from "./utils";

/**
 * Vue ErrorHandler
 * @internal
 */
export function setupVueErrorHandler(vue: Vue) {
  vue.config.errorHandler = (error: Error, vm: ViewModel, info: string) => {
    handle(error, vm, info);
  };
}

function handle(error: Error, vm: ViewModel, info: string): void {
  const componentName = formatComponentName(vm);
  const event: Event = {
    type: BreadcrumbType.Error,
    category: BreadcrumbCategory.CodeError,
    message: `${error.name}: ${error.message} [${info}] ${componentName}`,
    level: Severity.Error,
    timestamp: Date.now(),
    stack: error.stack,
  };
  getCurrentHub().captureEvent(event);
}
