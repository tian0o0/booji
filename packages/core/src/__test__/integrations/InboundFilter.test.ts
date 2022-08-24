import { getCurrentHub, getGlobalEventProcessors, Hub } from "@booji/hub";
import {
  BreadcrumbCategory,
  BreadcrumbType,
  Client,
  Integration,
  Options,
  Severity,
} from "@booji/types";
import { InboundFilterIntegration } from "../../integrations";

describe("InboundFilterIntegration", () => {
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

  let client: Client;

  const event = {
    type: BreadcrumbType.Error,
    category: BreadcrumbCategory.CodeError,
    level: Severity.Error,
    message: "error",
    timestamp: Date.now(),
  };

  let dedupe: Integration;

  beforeEach(() => {
    dedupe = new InboundFilterIntegration();
    dedupe.setup();
  });

  it("Hit on ignoreErrors", () => {
    client = new MockClient({
      dsn: "https://api.qingtian.life/booji",
      appKey: "xxx",
      ignoreErrors: ["error"],
    });
    hub.bindClient(client);
    const shouldDropEvent = getGlobalEventProcessors().some((callback) => {
      return callback(event) === null;
    });
    expect(shouldDropEvent).toBe(true);
  });

  it("Hit on ignoreUrls", () => {
    client = new MockClient({
      dsn: "https://api.qingtian.life/booji",
      appKey: "xxx",
      ignoreUrls: ["http://localhost:8080"],
    });
    hub.bindClient(client);
    const event = {
      type: BreadcrumbType.Error,
      category: BreadcrumbCategory.CodeError,
      level: Severity.Error,
      message: "error",
      timestamp: Date.now(),
      url: "http://localhost:8080",
    };
    const shouldDropEvent = getGlobalEventProcessors().some((callback) => {
      return callback(event) === null;
    });
    expect(shouldDropEvent).toBe(true);
  });

  it("Not hit", () => {
    client = new MockClient({
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
    };
    const shouldDropEvent = getGlobalEventProcessors().some((callback) => {
      return callback(event) === null;
    });
    expect(shouldDropEvent).toBe(false);
  });

  it("Not hit on rules ignoreUrls", () => {
    client = new MockClient({
      dsn: "https://api.qingtian.life/booji",
      appKey: "xxx",
      ignoreUrls: ["http://localhost:8080"],
    });
    hub.bindClient(client);
    const event = {
      type: BreadcrumbType.Error,
      category: BreadcrumbCategory.CodeError,
      level: Severity.Error,
      message: "error",
      timestamp: Date.now(),
      url: "http://localhost:8081",
    };
    const shouldDropEvent = getGlobalEventProcessors().some((callback) => {
      return callback(event) === null;
    });
    expect(shouldDropEvent).toBe(false);
  });

  it("Not hit on rules ignoreErrors", () => {
    client = new MockClient({
      dsn: "https://api.qingtian.life/booji",
      appKey: "xxx",
      ignoreErrors: ["exception"],
    });
    hub.bindClient(client);
    const event = {
      type: BreadcrumbType.Error,
      category: BreadcrumbCategory.CodeError,
      level: Severity.Error,
      message: "error",
      timestamp: Date.now(),
    };
    const shouldDropEvent = getGlobalEventProcessors().some((callback) => {
      return callback(event) === null;
    });
    expect(shouldDropEvent).toBe(false);
  });
});
