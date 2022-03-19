import { getCurrentHub } from "@booji/hub";
import { Client, Integration, Options, Performance } from "@booji/types";
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

    performance && PerformanceInstrument.setup();
  }
}

/**
 * Performance插装
 * @internal
 */
class PerformanceInstrument {
  static setup() {
    Global.onload = () => {
      // nextTick, 防止拿不到 loadEventEnd
      setTimeout(() => {
        if (!Global.performance) {
          return logger.warn(
            "当前环境不支持 `performance API`, 移除该选项以关闭警告"
          );
        }
        const pes = Global.performance.getEntries();

        PerformanceInstrument.handle(pes[0] as PerformanceNavigationTiming);
      });
      // pes.forEach((metric) => {
      //   switch (metric.entryType) {
      //     case "navigation":
      //       collectNavigation(metric);
      //       break;
      //     default:
      //       break;
      //   }
      // });
    };
  }

  static handle(timing: PerformanceNavigationTiming) {
    const p: Performance = {
      dns: timing.domainLookupEnd - timing.domainLookupStart,
      tcp: timing.connectEnd - timing.connectStart,
      request: timing.responseStart - timing.requestStart,
      response: timing.responseEnd - timing.responseStart,
      processing: timing.domComplete - timing.domInteractive,
      load: timing.loadEventEnd - timing.loadEventStart,
    };

    getCurrentHub().getScope().setPerformance(p);
  }
}
