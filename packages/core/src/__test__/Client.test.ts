import {
  BreadcrumbCategory,
  BreadcrumbType,
  Client,
  Event,
  Options,
  Severity,
} from "@booji/types";
import { CoreClient } from "..";
import { CoreReporter } from "../Reporter";

describe("Client", () => {
  let client: Client;
  let options: Options;
  beforeEach(() => {
    options = {
      dsn: "https://api.qingtian.life/booji",
      appKey: "xxx",
    };
    class MockReporter extends CoreReporter {
      async report(event: Event): Promise<void> {
        return;
      }
    }
    class MockClient extends CoreClient {
      reporter: MockReporter = new MockReporter();
      constructor(options: Options) {
        super(options);
      }
    }
    client = new MockClient(options);
  });

  it("captureException", () => {
    const captureException = jest.spyOn(client, "captureException");
    const error = new Error("error");
    client.captureException(error);
    expect(captureException).toBeCalledWith(error);
    captureException.mockClear();
  });

  it("captureMessage", () => {
    const captureMessage = jest.spyOn(client, "captureMessage");
    client.captureMessage("error", Severity.Info);
    expect(captureMessage).toBeCalledWith("error", Severity.Info);
    captureMessage.mockClear();
  });

  it("captureEvent", () => {
    const captureEvent = jest.spyOn(client, "captureEvent");
    const event = {
      type: BreadcrumbType.Error,
      category: BreadcrumbCategory.CodeError,
      level: Severity.Error,
      message: "error",
      timestamp: Date.now(),
    };
    client.captureEvent(event);
    expect(captureEvent).toBeCalledWith(event);
    captureEvent.mockClear();
  });

  it("getOptions", () => {
    const opts = client.getOptions();
    expect(opts).toStrictEqual(options);
  });
});
