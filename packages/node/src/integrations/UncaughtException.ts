import { Integration } from "@booji/types";
import { Global } from "@booji/utils";

/**
 *
 * 异常集成
 * @remarks
 * 实现了 {@link @booji/types#Integration} 接口
 * @public
 */
export class UncaughtExceptionIntegration implements Integration {
  /**
   * {@inheritDoc @booji/types#Integration.name}
   */
  name: string = "UncaughtExceptionIntegration";

  /**
   * {@inheritDoc @booji/types#Integration.setup}
   */
  setup(): void {
    // Global.process.on("uncaughtException")
  }
}
