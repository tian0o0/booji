import { emitter } from "@booji/utils";
import { BrowserClient } from "../../Client";
import { PerformanceIntegration } from "../../integrations";

describe("Performance", () => {
  const options = {
    dsn: "https://api.qingtian.life/booji",
    appKey: "xxx",
    performance: true,
  };
  const client = new BrowserClient(options);
  const performance = new PerformanceIntegration();

  it("onClientBinded", () => {
    const onClientBinded = jest.spyOn(performance, "onClientBinded");

    performance.setup();
    emitter.emit(client);
    expect(onClientBinded).toBeCalledWith(client);

    onClientBinded.mockClear();
  });
});
