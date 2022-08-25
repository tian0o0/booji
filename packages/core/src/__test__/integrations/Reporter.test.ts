import { getCurrentHub } from "@booji/hub";
import {
  BreadcrumbCategory,
  BreadcrumbType,
  Event,
  Options,
  Severity,
} from "@booji/types";
import { emitter } from "@booji/utils";
import { CoreClient } from "../../Client";
import { CoreReporter } from "../../Reporter";

describe("Reporter", () => {
  const hub = getCurrentHub();
  class MockReporter extends CoreReporter {
    async report(event: Event): Promise<void> {
      const _event = await this.beforeReport(event);
      if (!_event) return;
    }
  }
  class MockClient extends CoreClient {
    reporter: MockReporter = new MockReporter();
    options: Options;
    constructor(options: Options) {
      super(options);
      this.options = options;
    }
    init() {}
    captureEvent() {}
    captureException() {}
    captureMessage() {}
    getOptions() {
      return this.options;
    }
  }

  const event = {
    type: BreadcrumbType.Error,
    category: BreadcrumbCategory.CodeError,
    level: Severity.Error,
    message: "error",
    timestamp: Date.now(),
  };

  let client: MockClient;

  it("正常上报", () => {
    client = new MockClient({
      dsn: "https://api.qingtian.life/booji",
      appKey: "xxx",
    });
    hub.bindClient(client);

    const beforeReport = jest.spyOn(client.reporter, "beforeReport");

    client.reporter.report(event);
    emitter.emit(client);
    expect(beforeReport).toBeCalledWith(event);

    beforeReport.mockClear();
  });

  it("指定 customBeforeReport 并返回 event", async () => {
    client = new MockClient({
      dsn: "https://api.qingtian.life/booji",
      appKey: "xxx",
      async beforeReport(event: Event) {
        return Promise.resolve(event);
      },
    });
    hub.bindClient(client);

    const beforeReport = jest.spyOn(client.reporter, "beforeReport");

    await client.reporter.report(event);
    emitter.emit(client);
    expect(beforeReport.mock.results[0].value).resolves.toHaveProperty(
      "message"
    );

    beforeReport.mockClear();
  });

  it("指定 customBeforeReport 并返回 null", async () => {
    client = new MockClient({
      dsn: "https://api.qingtian.life/booji",
      appKey: "xxx",
      beforeReport(event: Event) {
        return null;
      },
    });
    hub.bindClient(client);

    const beforeReport = jest.spyOn(client.reporter, "beforeReport");

    await client.reporter.report(event);
    emitter.emit(client);
    expect(beforeReport.mock.results[0].value).resolves.toBe(null);

    beforeReport.mockClear();
  });
});
