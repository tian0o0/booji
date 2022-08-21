import { addGlobalEventProcessor, getCurrentHub } from "@booji/hub";
import { Event, Integration } from "@booji/types";
import { logger } from "@booji/utils";

/**
 * 事件去重集成
 * @remarks
 * 实现了 {@link @booji/types#Integration} 接口
 * @public
 */
export class DedupeIntegration implements Integration {
  /**
   * {@inheritDoc @booji/types#Integration.name}
   */
  name: string = "DedupeIntegration";
  /**
   * 上次上报的事件
   */
  private previousEvent?: Event;
  /**
   * 是否禁用 Dedupe
   */
  private get disableDedupe(): boolean {
    return getCurrentHub().client.getOptions().dedupe === false;
  }
  /**
   * {@inheritDoc @booji/types#Integration.setup}
   */
  setup() {
    addGlobalEventProcessor((event: Event): Event | null => {
      if (this.shouldDropEvent(event, this.previousEvent)) return null;
      this.previousEvent = event;
      return event;
    });
  }
  /**
   *
   * @param event - {@link @booji/types#Event}
   * @param previousEvent - {@link @booji/types#Event}
   * @returns boolean
   * @internal
   */
  private shouldDropEvent(event: Event, previousEvent?: Event): boolean {
    if (this.disableDedupe) return false;

    if (!previousEvent) return false;

    if (event.eventHash === previousEvent.eventHash) {
      logger.warn(
        "监测到重复事件上报，这很有可能是无意义的，因此取消本次事件上报。如需关闭重复事件监测，可设置`dedupe: false`"
      );
      return true;
    }
    return false;
  }
}
