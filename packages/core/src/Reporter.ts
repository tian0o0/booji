import { getCurrentHub, getGlobalEventProcessors } from "@booji/hub";
import { Event, Reporter } from "@booji/types";
import { createHash, linkedList2array, logger, uuid4 } from "@booji/utils";

/**
 * 基础上报中心，实现了 {@link @booji/types#Reporter} 接口
 * @public
 */
export abstract class CoreReporter implements Reporter {
  /**
   * {@inheritDoc @booji/types#Reporter.beforeReport}
   */
  async beforeReport(event: Event): Promise<Event | null> {
    const { scope, client } = getCurrentHub();
    // Generate list data from `breadcrumbStack`/`playbackQueue`
    const { breadcrumbStack, playbackQueue, ...res } = scope;
    // Generate eventId/eventHash/issueId
    event.eventId = uuid4();
    event.eventHash = createHash(event, res.user);
    event.issueId = createHash(event);
    // Attach scope to event
    event = {
      ...event,
      ...res,
      breadcrumbs: breadcrumbStack.stacks,
      playbacks: linkedList2array(playbackQueue),
    };

    // Drop event if necessary
    const shouldDropEvent = getGlobalEventProcessors().some((callback) => {
      return callback(event) === null;
    });
    if (shouldDropEvent) return Promise.resolve(null);

    // Check custom `beforeReport` hook
    const customBeforeReport = client.getOptions().beforeReport;
    if (customBeforeReport) {
      if (typeof customBeforeReport === "function") {
        const customEvent = await customBeforeReport(event);
        if (!customEvent) {
          logger.warn("`beforeReport hook`没有返回值，取消事件上报");
          return Promise.resolve(null);
        }
        this.afterEventReady();
        return Promise.resolve(customEvent);
      } else {
        logger.error("`beforeReport hook`必须是函数");
      }
    }

    this.afterEventReady();
    return Promise.resolve(event);
  }

  /**
   * {@inheritDoc @booji/types#Reporter.report}
   */
  abstract report(event: Event): Promise<void>;

  /**
   * {@inheritDoc @booji/types#Reporter.afterEventReady}
   */
  afterEventReady(): void {
    getCurrentHub().scope.clearBreadcrumb();
    getCurrentHub().scope.clearPlayback();
  }
}
