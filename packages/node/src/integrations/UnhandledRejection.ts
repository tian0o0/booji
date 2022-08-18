import { Integration } from "@booji/types";

/**
 *
 * 未捕获的Promise错误集成
 * @remarks
 * 实现了 {@link @booji/types#Integration} 接口
 * @public
 */
export class UnhandledRejectionIntegration implements Integration {
  /**
   * {@inheritDoc @booji/types#Integration.name}
   */
  name: string = "UnhandledRejectionIntegration";

  /**
   * {@inheritDoc @booji/types#Integration.setup}
   */
  setup(): void {
    throw new Error("Method not implemented.");
  }
}
