import { getCurrentHub } from "@booji/hub";
import {
  BreadcrumbItem,
  BreadcrumbCategory,
  BreadcrumbType,
  Severity,
} from "@booji/types";
import { Global, isSupportHistory, rewrite } from "@booji/utils";

/**
 * history插装
 * @internal
 */
export class HistoryInstrument {
  static setup() {
    if (!isSupportHistory()) return;
    let previousHref: string;
    const originOnpopstate = Global.onpopstate;
    Global.onpopstate = function (this: WindowEventHandlers, ...args: any) {
      const to = Global.location.href;
      const from = previousHref;
      previousHref = to;
      HistoryInstrument.handle(from, to);
      originOnpopstate?.apply(this, args);
    };

    rewrite(Global.history, "pushState", historyReplacementFunction);
    rewrite(Global.history, "replaceState", historyReplacementFunction);

    function historyReplacementFunction(
      originalHistoryFunction: () => void
    ): () => void {
      return function (this: History, ...args: any): void {
        const url = args.length > 2 ? args[2] : undefined;
        if (url) {
          const from = previousHref;
          const to = String(url);
          previousHref = to;
          HistoryInstrument.handle(from, to);
        }
        return originalHistoryFunction.apply(this, args);
      };
    }
  }

  static handle(from: string, to: string) {
    const breadcrumb: BreadcrumbItem = {
      type: BreadcrumbType.Route,
      category: BreadcrumbCategory.History,
      level: Severity.Info,
      data: {
        from,
        to,
      },
      timestamp: Date.now(),
    };
    getCurrentHub().addBreadcrumb(breadcrumb);
  }
}
