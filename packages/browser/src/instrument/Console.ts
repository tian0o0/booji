import {
  BreadcrumbItem,
  BrowserBreadcrumbCategory,
  BrowserBreadcrumbType,
} from "@booji/types";
import { Global, rewrite, severityFromString } from "@booji/utils";
import { getCurrentHub } from "@booji/hub";

/**
 * console 插装
 * @internal
 */
export class ConsoleInstrument {
  static setup(): void {
    if (!("console" in Global)) return;

    ["debug", "info", "warn", "error", "log", "assert"].forEach(
      (level: string) => {
        if (!(level in Global.console)) return;

        rewrite(Global.console, level, (originalConsoleLevel: () => void) => {
          return (...args: any) => {
            ConsoleInstrument.handle({ args, level });
            if (originalConsoleLevel) {
              originalConsoleLevel.apply(Global.console, args);
            }
          };
        });
      }
    );
  }
  static handle(data: any): void {
    const breadcrumb: BreadcrumbItem = {
      type: BrowserBreadcrumbType.Debug,
      category: BrowserBreadcrumbCategory.Console,
      data: {
        arguments: data.args,
        logger: "console",
      },
      level: severityFromString(data.level),
      timestamp: Date.now(),
    };

    if (data.level === "assert") {
      // TODO: assert
    }

    getCurrentHub().addBreadcrumb(breadcrumb);
  }
}
