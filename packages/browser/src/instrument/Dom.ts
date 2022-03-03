import {
  BreadcrumbItem,
  BrowserBreadcrumbCategory,
  BrowserBreadcrumbType,
  Severity,
} from "@booji/types";
import { Global, htmlElement2String } from "@booji/utils";
import { getCurrentHub } from "@booji/hub";

/**
 * Dom插装（目前仅支持点击事件）
 * @internal
 */
export class DomInstrument {
  static setup(): void {
    if (!("document" in Global)) return;

    const proto = Global.EventTarget?.prototype;

    if (!proto) return;

    Global.document.addEventListener("click", function () {
      // console.log(this.activeElement); TODO: react returns body
      DomInstrument.handle(this.activeElement);
    });
  }
  static handle(data: any): void {
    const str = htmlElement2String(data);

    if (!str) return;
    const breadcrumb: BreadcrumbItem = {
      type: BrowserBreadcrumbType.User,
      category: BrowserBreadcrumbCategory.Click,
      level: Severity.Info,
      data: htmlElement2String(data),
      timestamp: Date.now(),
    };
    getCurrentHub().addBreadcrumb(breadcrumb);
  }
}
