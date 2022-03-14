import { Client, Integration, Options } from "@booji/types";
import { emitter, Global, logger } from "@booji/utils";

/**
 * 性能监控集成
 * @remarks
 * 实现了 {@link @booji/types#Integration} 接口
 * @public
 */
export class PerformanceIntegration implements Integration {
  /**
   * {@inheritDoc @booji/types#Integration.name}
   */
  name: string = "PerformanceIntegration";

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
    const { performance = false }: Options = client.getOptions();

    if (!performance) return;

    Global.onload = () => {
      if (!Global.performance) {
        return logger.warn(
          "当前环境不支持 `performance API`, 移除该选项以关闭警告"
        );
      }
      const arr = Global.performance.getEntries();
      console.log(arr);
    };
  }
}
