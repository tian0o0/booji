import { Global } from "@booji/utils";
import { getCurrentHub } from "@booji/hub";

/**
 * UnhandledRejection插装
 * @internal
 */
export class UnhandledRejectionInstrument {
  static setup(): void {
    Global.process.on(
      "unhandledRejection",
      UnhandledRejectionInstrument.handle
    );
  }
  static handle(reason: any, promise: any): void {
    getCurrentHub().captureException(reason);
  }
}
