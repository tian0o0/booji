/* istanbul ignore file */
import { CoreReporter } from "@booji/core";
import { getCurrentHub } from "@booji/hub";
import { Event } from "@booji/types";
import { Global, logger } from "@booji/utils";

/**
 * Browser端上报中心，继承自 {@link @booji/core#CoreClient}
 * @public
 */
export class BrowserReporter extends CoreReporter {
  private worker?: Worker;
  private webWorker?: { url: string; queue?: boolean };

  /**
   * XHR上报
   * @param url - string
   * @param event - {@link @booji/types#Event}
   */
  reportByXhr(url: string, event: Event) {
    const xhr = new XMLHttpRequest();
    xhr.open("post", url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // xhr.withCredentials = true;
    // if (typeof this.configXhr === "function") {
    //   this.configXhr(xhr, event);
    // }
    xhr.send(JSON.stringify(event));
  }

  /**
   * IMAGE上报
   * @param url - string
   * @param data - any
   */
  reportByImg(url: string, data: any) {
    new Image().src = `${url}?data=${JSON.stringify(data)}`;
  }

  /**
   * Web Worker上报
   * @param dsn - string
   * @param event - {@link @booji/types#Event}
   * @returns void
   */
  reportByWorker(dsn: string, event: Event) {
    if (!Global.Worker) {
      logger.warn(
        "当前环境不支持 Web Worker, 回退至默认的XHR上报, 请移除`worker`配置项以关闭该警告."
      );
      return this.reportByXhr(dsn, event);
    }
    this.worker = this.worker || new Worker(this.webWorker?.url as string);
    this.worker.postMessage({ event, dsn });
  }

  /**
   * Beacon上报
   * @param dsn - string
   * @param data - any
   * @returns void
   */
  reportByBeacon(dsn: string, data: any) {
    if (!Global.navigator) {
      logger.warn("当前环境不支持 navigator API, 回退至默认的XHR上报.");
      return this.reportByXhr(dsn, data);
    }
    // Content-Type only allows:
    // application/x-www-form-urlencoded、multipart/form-data、text/plain
    const fd = new FormData();
    for (const key in data) {
      fd.append(key, data[key]);
    }
    navigator.sendBeacon(dsn, fd);
  }

  /**
   * 使用那种上报方式
   * @param dsn - string
   * @param event - {@link @booji/types#Event}
   * @internal
   */
  private reportBy(dsn: string, event: Event) {
    const { worker } = getCurrentHub().client.getOptions();
    this.webWorker = worker;
    if (this.webWorker) {
      this.reportByWorker(dsn, event);
    } else {
      this.reportByXhr(dsn, event);
    }
  }

  /**
   * {@inheritDoc @booji/types#Reporter.report}
   */
  async report(event: Event) {
    const _event = await this.beforeReport(event);
    if (!_event) return;
    const dsn = getCurrentHub().client.getOptions().dsn as string;
    this.reportBy(dsn, _event);
  }

  /**
   * {@inheritDoc @booji/types#Reporter.beforeReport}
   */
  async beforeReport(event: Event): Promise<Event | null> {
    event.url = Global.location.href;
    const _event = await super.beforeReport(event);
    return _event;
  }
}
