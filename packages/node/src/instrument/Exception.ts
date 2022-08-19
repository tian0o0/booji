import { getCurrentHub } from "@booji/hub";
import { Global } from "@booji/utils";

/**
 * Exception插装，用于监听代码运行时错误
 * @internal
 */
export class ExceptionInstrument {
  static setup(): void {
    Global.process.on("uncaughtException", ExceptionInstrument.handle);
  }
  static handle(error: Error): void {
    getCurrentHub().captureException(error);
  }
}
