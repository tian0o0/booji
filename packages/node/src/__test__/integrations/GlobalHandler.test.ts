import { emitter } from "@booji/utils";
import { NodeClient } from "../../Client";
import { GlobalHandlerIntegration } from "../../integrations";

describe("GlobalHandler", () => {
  const options = {
    dsn: "https://api.qingtian.life/booji",
    appKey: "xxx",
  };
  const client = new NodeClient(options);
  const globalHandler = new GlobalHandlerIntegration();

  it("onClientBinded", () => {
    const onClientBinded = jest.spyOn(globalHandler, "onClientBinded");

    globalHandler.setup();
    emitter.emit(client);
    expect(onClientBinded).toBeCalledWith(client);

    onClientBinded.mockClear();
  });
});
