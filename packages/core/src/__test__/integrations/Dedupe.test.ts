import { getCurrentHub, getGlobalEventProcessors, Hub } from "@booji/hub";
import {
  BreadcrumbCategory,
  BreadcrumbType,
  Client,
  Integration,
  Options,
  Severity,
} from "@booji/types";
import { DedupeIntegration } from "../../integrations";

describe("DedupeIntegration", () => {
  const hub = getCurrentHub();
  class MockClient implements Client {
    options: Options;
    constructor(options: Options) {
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
  const client = new MockClient({
    dsn: "https://api.qingtian.life/booji",
    appKey: "xxx",
  });
  hub.bindClient(client);

  const event = {
    type: BreadcrumbType.Error,
    category: BreadcrumbCategory.CodeError,
    level: Severity.Error,
    message: "error",
    timestamp: Date.now(),
    eventHash: "12345",
  };

  let dedupe: Integration;

  beforeEach(() => {
    dedupe = new DedupeIntegration();
    dedupe.setup();
  });

  it("shouldDropEvent: false", () => {
    const shouldDropEvent = getGlobalEventProcessors().some((callback) => {
      return callback(event) === null;
    });
    expect(shouldDropEvent).toBe(false);
  });

  it("shouldDropEvent: true", () => {
    (dedupe as any).previousEvent = event;
    const shouldDropEvent = getGlobalEventProcessors().some((callback) => {
      return callback(event) === null;
    });
    expect(shouldDropEvent).toBe(true);
  });
});
