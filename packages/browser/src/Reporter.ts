import { CoreReporter } from "@booji/core";
import { getCurrentHub } from "@booji/hub";
import { Event } from "@booji/types";
import { Global, logger } from "@booji/utils";

/**
 * Browser端上报中心，继承自 {@link @booji/core#CoreClient}
 */
export class BrowserReporter extends CoreReporter {
  private worker?: Worker;
  private webWorker?: { url: string; queue?: boolean };
  reportByXhr(url: string, data: any) {
    const xhr = new XMLHttpRequest();
    xhr.open("post", url, false);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // xhr.withCredentials = true;
    // if (typeof this.configReportXhr === "function") {
    //   this.configReportXhr(xhr, data);
    // }
    xhr.send(JSON.stringify(data));
  }
  reportByImg(url: string, data: any) {
    new Image().src = `${url}?data=${JSON.stringify(data)}`;
  }
  reportByWorker(dsn: string, event: Event) {
    if (!Global.Worker) {
      logger.warn(
        "当前环境不支持 Web Worker, 回退至默认的XHR上报, 请移除`webWorker`配置项以关闭该警告."
      );
      return this.reportByXhr(dsn, event);
    }
    this.worker = this.worker || new Worker(this.webWorker?.url as string);
    this.worker.postMessage({ event, dsn });
  }
  reportBy(dsn: string, event: Event) {
    const { webWorker } = getCurrentHub().client.getOptions();
    this.webWorker = webWorker;
    if (this.webWorker) {
      this.reportByWorker(dsn, event);
    } else {
      this.reportByXhr(dsn, event);
    }
  }
  async report(event: Event) {
    const _event = await this.beforeReport(event);
    if (!_event) return;
    const dsn = getCurrentHub().client.getOptions().dsn as string;
    this.reportBy(dsn, _event);
  }
  async beforeReport(event: Event): Promise<Event | null> {
    event.url = Global.location.href;
    const _event = await super.beforeReport(event);
    return _event;
  }
}
