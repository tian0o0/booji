import { addGlobalEventProcessor, getCurrentHub } from "@booji/hub";
import {
  Event,
  InboundFilterOptions,
  Integration,
  Options,
} from "@booji/types";
import { isMatchingPattern, logger } from "@booji/utils";

/**
 * 过滤器集成
 * @remarks
 * 开启后可使用 `ignoreUrls`/`ignoreErrors` 配置项（默认开启）
 * @public
 */
export class InboundFilterIntegration implements Integration {
  /**
   * {@inheritDoc @booji/types#Integration.name}
   */
  name: string = "InboundFilterIntegration";
  constructor(private options: InboundFilterOptions = {}) {}
  /**
   * {@inheritDoc @booji/types#Integration.setup}
   */
  setup() {
    addGlobalEventProcessor((event: Event): Event | null => {
      const options = this.mergeOptions(getCurrentHub().client.getOptions());
      if (this.shouldDropEvent(event, options)) return null;
      return event;
    });
  }

  private mergeOptions(clientOptions: Options): InboundFilterOptions {
    return {
      ignoreUrls: [
        ...(this.options.ignoreUrls || []),
        ...(clientOptions.ignoreUrls || []),
      ],
      ignoreErrors: [
        ...(this.options.ignoreErrors || []),
        ...(clientOptions.ignoreErrors || []),
      ],
    };
  }

  private shouldDropEvent(
    event: Event,
    options: InboundFilterOptions
  ): boolean {
    if (this.isIgnoredUrl(event, options)) return true;
    if (this.isIgnoredError(event, options)) return true;
    return false;
  }

  private isIgnoredUrl(event: Event, options: InboundFilterOptions): boolean {
    if (!options.ignoreUrls || !options.ignoreUrls.length) {
      return false;
    }

    const url = event.url;
    if (url) {
      const isMatch = options.ignoreUrls.some((pattern) =>
        isMatchingPattern(url, pattern)
      );
      if (isMatch) {
        logger.warn(
          "错误事件发生时的url命中 `ignoreUrls`, 因此取消本次事件上报。"
        );
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  private isIgnoredError(event: Event, options: InboundFilterOptions): boolean {
    if (!options.ignoreErrors || !options.ignoreErrors.length) {
      return false;
    }

    const message = event.message;
    if (message) {
      const isMatch = options.ignoreErrors.some((pattern) =>
        isMatchingPattern(message, pattern)
      );
      if (isMatch) {
        logger.warn("错误事件命中 `ignoreErrors`, 因此取消本次事件上报。");
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
}
