import { Client, GlobalHandlerOptions, Integration } from "@booji/types";
import { emitter } from "@booji/utils";
import { ErrorInstrument, UnhandledRejectionInstrument } from "../instrument";

/**
 * 全局错误处理集成
 * @remarks
 * 实现了 {@link @booji/types#Integration} 接口
 * @public
 */
export class GlobalHandlerIntegration implements Integration {
  /**
   * {@inheritDoc @booji/types#Integration.name}
   */
  name: string = "GlobalHandlerIntegration";

  /**
   * {@inheritDoc @booji/types#Integration.setup}
   */
  setup() {
    emitter.once(this.onClientBinded);
  }

  /**
   * {@inheritDoc  @booji/types#Integration.onClientBinded}
   */
  onClientBinded(client: Client) {
    const {
      onerror = true,
      onunhandledrejection = true,
    }: GlobalHandlerOptions = client.getOptions();

    onerror && ErrorInstrument.setup();
    onunhandledrejection && UnhandledRejectionInstrument.setup();
  }
}
