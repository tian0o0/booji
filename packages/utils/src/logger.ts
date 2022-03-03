import { Global } from "./global";
const PREFIX = "Booji Logger";

/**
 * 自定义Logger
 */
class Logger {
  private enabled: boolean = false;
  private consoleSandbox: { [key: string]: any } = {};
  constructor() {
    if ("console" in Global) {
      const levels = ["log", "debug", "info", "warn", "error", "assert"];
      levels.forEach((level: string) => {
        if (!(level in Global.console)) return;
        this.consoleSandbox[level] = (Global.console as any)[level];
      });
    }
  }
  enable(): void {
    this.enabled = true;
  }
  disable(): void {
    this.enabled = false;
  }
  get isEnabled(): boolean {
    return this.enabled;
  }
  /* istanbul ignore next */
  log(...args: any): void {
    if (!this.enabled) return;
    this.consoleSandbox.log(`${PREFIX}[Log]:`, ...args);
  }
  /* istanbul ignore next */
  warn(...args: any): void {
    if (!this.enabled) return;
    this.consoleSandbox.warn(`${PREFIX}[Warn]:`, ...args);
  }
  /* istanbul ignore next */
  error(...args: any): void {
    if (!this.enabled) return;
    this.consoleSandbox.error(`${PREFIX}[Error]:`, ...args);
  }
}

Global.__BOOJI__ = Global.__BOOJI__ || {};

/**
 * logger对象
 * @example
 * ```ts
 * import { logger } from "@booji/utils"
 * logger.log('xxx')
 * ```
 * @public
 */
const logger =
  (Global.__BOOJI__.logger as Logger) ||
  (Global.__BOOJI__.logger = new Logger());

export { logger };
