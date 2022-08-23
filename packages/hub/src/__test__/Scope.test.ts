import {
  BreadcrumbCategory,
  BreadcrumbType,
  Client,
  Event,
  EventProcessor,
  Options,
  Playback,
  Severity,
} from "@booji/types";
import { emitter, linkedList2array } from "@booji/utils";
import { Scope, getGlobalEventProcessors, addGlobalEventProcessor } from "..";

describe("Scope", () => {
  const scope = new Scope();
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
  emitter.emit(client);

  it("should `setUser` works correctly", () => {
    scope.setUser({
      name: "test",
    });
    expect(scope.user.name).toBe("test");
  });

  it("should `addBreadcrumb/clearBreadcrumb` works correctly", () => {
    const breadcrumbItem = {
      type: BreadcrumbType.Custom,
      category: BreadcrumbCategory.CaptureMessage,
      data: "test",
      level: Severity.Info,
      timestamp: Date.now(),
    };
    scope.addBreadcrumb(breadcrumbItem);
    expect(scope.breadcrumbStack.stacks).toStrictEqual([breadcrumbItem]);
    scope.clearBreadcrumb();
    expect(scope.breadcrumbStack.stacks).toStrictEqual([]);
  });

  it("should `collectPlayback/clearPlayback` works correctly", () => {
    const playback = {
      data: { a: 1 },
      timestamp: 1661230412646,
      type: 3,
    };
    scope.collectPlayback(playback);
    expect(linkedList2array(scope.playbackQueue)).toStrictEqual([playback]);
    scope.clearPlayback();
    expect(scope.breadcrumbStack.stacks).toStrictEqual([]);
  });
});

describe("GlobalEventProcessors", () => {
  it("should `getGlobalEventProcessors` works correctly", () => {
    const globalEventProcessors = getGlobalEventProcessors();
    expect(globalEventProcessors).toStrictEqual([]);

    const callback: EventProcessor = (event: Event) => null;
    addGlobalEventProcessor(callback);
    expect(globalEventProcessors).toStrictEqual([callback]);
  });
});
