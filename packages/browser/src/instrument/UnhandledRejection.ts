import {
  BrowserBreadcrumbCategory,
  BrowserBreadcrumbType,
  Event,
  Severity,
} from "@booji/types";
import { Global } from "@booji/utils";
import { getCurrentHub } from "@booji/hub";

/**
 * UnhandledRejection插装
 * @internal
 */
export class UnhandledRejectionInstrument {
  static setup(): void {
    Global.onunhandledrejection = (e: any) => {
      UnhandledRejectionInstrument.handle(e.reason);
      return true;
    };
  }
  static handle(data: any): void {
    const r: Event = {
      type: BrowserBreadcrumbType.Error,
      category: BrowserBreadcrumbCategory.Unhandledrejection,
      level: Severity.Error,
      message: data,
      timestamp: Date.now(),
    };
    getCurrentHub().captureEvent(r);
  }
}
