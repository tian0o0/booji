/* istanbul ignore file */
import { getCurrentHub } from "@booji/hub";
import {
  BreadcrumbItem,
  BreadcrumbCategory,
  BreadcrumbType,
  Severity,
} from "@booji/types";
import { Global, rewrite } from "@booji/utils";

/**
 * HashChange插装
 * @internal
 */
export class HashChangeInstrument {
  static setup() {
    if (!("hashchange" in Global)) return;
    rewrite(Global, "hashchange", function (e: HashChangeEvent) {
      HashChangeInstrument.handle(e.oldURL, e.newURL);
    });
  }
  static handle(from: string, to: string) {
    const breadcrumb: BreadcrumbItem = {
      type: BreadcrumbType.Route,
      category: BreadcrumbCategory.HashChange,
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
