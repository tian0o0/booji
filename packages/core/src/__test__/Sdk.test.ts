import { Client, Options } from "@booji/types";
import { initClientAndBindHub } from "..";

describe("Sdk", () => {
  it("initClientAndBindHub", () => {
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
    const options = {
      dsn: "https://api.qingtian.life/booji",
      appKey: "xxx",
    };
    initClientAndBindHub(MockClient, options);
  });
});
