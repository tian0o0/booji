import { CoreClient } from "@booji/core";
import { getCurrentHub } from "@booji/hub";
import {
  BreadcrumbCategory,
  BreadcrumbType,
  Options,
  Severity,
} from "@booji/types";
import { NodeReporter } from "../Reporter";

describe("Reporter", () => {
  const hub = getCurrentHub();
  const reporter = new NodeReporter();
  const event = {
    type: BreadcrumbType.Error,
    category: BreadcrumbCategory.CodeError,
    level: Severity.Error,
    message: "error",
    timestamp: Date.now(),
  };
  class MockClient extends CoreClient {
    reporter: NodeReporter = reporter;
    constructor(options: Options) {
      super(options);
    }
  }
  const client = new MockClient({
    dsn: "http://localhost:3000/api/booji",
    appKey: "xxx",
  });
  hub.bindClient(client);

  it("works", async () => {
    const spy = jest.spyOn(reporter, "reportByHttp");

    // (http.request as jest.Mock).mockImplementation((options, response) => {
    //   console.log("How to mock ..!" + response);
    //   return {
    //     on: jest.fn(),
    //     write: jest.fn(),
    //     end: jest.fn(),
    //   };
    // });

    await reporter.report(event);

    expect(spy).toBeCalled();
  });
});
