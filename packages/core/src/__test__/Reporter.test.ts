import { Hub } from "@booji/hub";
import {
  BreadcrumbCategory,
  BreadcrumbType,
  Client,
  Event,
  Options,
  Reporter,
  Severity,
} from "@booji/types";
import { CoreClient, CoreReporter } from "..";

describe("Reporter", () => {
  let client: Client;
  let reporter: Reporter;
  let options: Options;
  let hub: Hub;
  beforeAll(() => {
    options = {
      dsn: "https://api.qingtian.life/booji",
      appKey: "xxx",
    };
    class MockReporter extends CoreReporter {
      async report(event: Event): Promise<void> {
        const _event = await this.beforeReport(event);
        if (!_event) return;
      }
    }
    class MockClient extends CoreClient {
      reporter: MockReporter = new MockReporter();
      constructor(options: Options) {
        super(options);
      }
    }
    reporter = new MockReporter();
    client = new MockClient(options);
    hub = new Hub();
    hub.bindClient(client);
    // jest.mock("@booji/hub", () => {
    // })
  });

  it("beforeReport", async () => {
    // const beforeReportSpy = jest.spyOn(reporter, "beforeReport");
    const event = {
      type: BreadcrumbType.Error,
      category: BreadcrumbCategory.CodeError,
      level: Severity.Error,
      message: "error",
      timestamp: Date.now(),
    };
    // const callback = jest.fn();
    // emitter.once((client: Client) => {
    //   reporter.report(event);
    //   callback(client);
    // });

    // expect(beforeReportSpy).toBeCalled();
    // expect(callback).toBeCalledTimes(1);
  });
});
