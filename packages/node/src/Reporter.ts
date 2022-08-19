import { CoreReporter } from "@booji/core";
import { getCurrentHub } from "@booji/hub";
import { Event } from "@booji/types";
import http, { Agent, RequestOptions } from "http";
/**
 * Node端上报中心，继承自 {@link @booji/core#CoreClient}
 */
export class NodeReporter extends CoreReporter {
  agent: Agent;
  constructor() {
    super();
    this.agent = new Agent({ keepAlive: false, maxSockets: 30, timeout: 3000 });
  }
  reportByHttp(dsn: string, event: Event) {
    const options: RequestOptions = {
      agent: this.agent,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const req = http.request(dsn, options);

    req.on("error", (e) => {
      console.log(e);
    });
    req.write(JSON.stringify(event));
    req.end();
  }

  async report(event: Event): Promise<void> {
    const _event = await this.beforeReport(event);
    if (!_event) return;
    const dsn = getCurrentHub().client.getOptions().dsn as string;
    this.reportByHttp(dsn, _event);
  }
}
