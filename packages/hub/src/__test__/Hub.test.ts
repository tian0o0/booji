import {
  captureEvent,
  captureException,
  captureMessage,
  customScope,
  getCurrentHub,
  Hub,
} from "..";
import {
  BreadcrumbCategory,
  BreadcrumbItem,
  BreadcrumbType,
  Client,
  Options,
  Severity,
} from "@booji/types";
describe("Hub", () => {
  const hub = new Hub();
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

  it("should `bindClient` works correctly", () => {
    expect(hub.client).toStrictEqual(client);
  });

  it("should `getScope` works correctly", () => {
    expect(hub.getScope()).toStrictEqual(hub.scope);
  });

  it("should `customScope` works correctly", () => {
    hub.customScope((scope) => {
      scope.setUser({
        name: "test",
      });
    });
    expect(hub.getScope().user.name).toBe("test");
  });

  it("should `addBreadcrumb` works correctly", () => {
    const addBreadcrumbSpy = jest.spyOn(hub.getScope(), "addBreadcrumb");
    const breadcrumbItem = {
      type: BreadcrumbType.Custom,
      category: BreadcrumbCategory.CaptureMessage,
      data: "test",
      level: Severity.Info,
      timestamp: Date.now(),
    };
    hub.addBreadcrumb(breadcrumbItem);
    expect(addBreadcrumbSpy).toHaveBeenCalled();
  });

  it("should `collectPlayback` works correctly", () => {
    const collectPlaybackSpy = jest.spyOn(hub.getScope(), "collectPlayback");
    const playback = {
      data: { a: 1 },
      timestamp: 1661230412646,
      type: 3,
    };
    hub.collectPlayback(playback);
    expect(collectPlaybackSpy).toHaveBeenCalled();
  });

  it("should `captureEvent` works correctly", () => {
    jest.useFakeTimers();
    const invokeClient = jest.spyOn(hub as any, "invokeClient");
    const event = {
      type: BreadcrumbType.Error,
      category: BreadcrumbCategory.CodeError,
      level: Severity.Error,
      message: "error",
      timestamp: Date.now(),
    };
    hub.captureEvent(event);
    jest.runAllTimers();
    expect(invokeClient).toBeCalledWith("captureEvent", event);
    invokeClient.mockClear();
  });

  it("should `captureException` works correctly", () => {
    const invokeClient = jest.spyOn(hub as any, "invokeClient");
    const error = new Error("error");
    hub.captureException(error);
    expect(invokeClient).toBeCalledWith("captureException", error);
    invokeClient.mockClear();
  });

  it("should `captureMessage` works correctly", () => {
    const invokeClient = jest.spyOn(hub as any, "invokeClient");
    hub.captureMessage("error", Severity.Info);
    expect(invokeClient).toBeCalledWith(
      "captureMessage",
      "error",
      Severity.Info
    );
    invokeClient.mockClear();
  });

  it("customScope", () => {
    customScope((scope) => {
      scope.setUser({
        name: "test",
      });
    });
    expect(hub.getScope().user.name).toBe("test");
  });
});

describe("Hub2", () => {
  const hub = new Hub();
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
    beforeAddBreadcrumb(breadcrumb: BreadcrumbItem) {
      return null;
    },
  });
  hub.bindClient(client);

  it("should `addBreadcrumb` works correctly", () => {
    const addBreadcrumbSpy = jest.spyOn(hub.getScope(), "addBreadcrumb");
    const breadcrumbItem = {
      type: BreadcrumbType.Custom,
      category: BreadcrumbCategory.CaptureMessage,
      data: "test",
      level: Severity.Info,
      timestamp: Date.now(),
    };
    hub.addBreadcrumb(breadcrumbItem);
    expect(addBreadcrumbSpy).not.toHaveBeenCalled();
  });
});

describe("Hub3", () => {
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

  it("getCurrentHub", () => {
    expect(hub).not.toBeNull();
  });

  it("captureEvent", () => {
    jest.useFakeTimers();
    const invokeClient = jest.spyOn(hub as any, "invokeClient");
    const event = {
      type: BreadcrumbType.Error,
      category: BreadcrumbCategory.CodeError,
      level: Severity.Error,
      message: "error",
      timestamp: Date.now(),
    };
    captureEvent(event);
    jest.runAllTimers();
    expect(invokeClient).toBeCalledWith("captureEvent", event);
    invokeClient.mockClear();
  });

  it("captureException", () => {
    const invokeClient = jest.spyOn(hub as any, "invokeClient");
    const error = new Error("error");
    captureException(error);
    expect(invokeClient).toBeCalledWith("captureException", error);
    invokeClient.mockClear();
  });

  it("captureMessage", () => {
    const invokeClient = jest.spyOn(hub as any, "invokeClient");
    captureMessage("error", Severity.Info);
    expect(invokeClient).toBeCalledWith(
      "captureMessage",
      "error",
      Severity.Info
    );
    invokeClient.mockClear();
  });
});
