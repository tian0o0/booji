import { Client, Event, Options, Severity } from "@booji/types";
import { logger } from "@booji/utils";
import { CoreReporter } from ".";
import {
  createEventFromException,
  createEventFromMessage,
} from "./EventBuilder";
import { setupIntegrations } from "./Integration";

/**
 * 基础抽象客户端，实现了 {@link @booji/types#Client} 接口，各端需要继承该类
 * @public
 */
export abstract class CoreClient implements Client {
  protected readonly options: Options;

  /**
   * 子类需要自行实现上报中心
   */
  abstract reporter: CoreReporter;

  protected constructor(options: Options) {
    this.options = options;
    this.init();
  }

  /**
   * {@inheritDoc @booji/types#Client.init}
   */
  init() {
    const { debug } = this.options;
    debug && logger.enable();
    setupIntegrations(this.options);
  }

  /**
   * {@inheritDoc @booji/types#Client.captureException}
   */
  public captureException(exception: Error | string) {
    const event = createEventFromException(exception);
    this.reporter.report(event);
  }

  /**
   * {@inheritDoc @booji/types#Client.captureMessage}
   */
  public captureMessage(message: string, level?: Severity) {
    const event = createEventFromMessage(message, level);
    this.reporter.report(event);
  }

  /**
   * {@inheritDoc @booji/types#Client.captureEvent}
   */
  public captureEvent(event: Event) {
    this.reporter.report(event);
  }

  /**
   * {@inheritDoc @booji/types#Client.getOptions}
   */
  public getOptions() {
    return this.options;
  }
}
