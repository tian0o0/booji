import { emitter } from "@booji/utils";
import { BrowserClient } from "../../Client";
import { PlaybackIntegration } from "../../integrations";

describe("Performance", () => {
  const options = {
    dsn: "https://api.qingtian.life/booji",
    appKey: "xxx",
  };
  const client = new BrowserClient(options);
  const playback = new PlaybackIntegration();

  it("onClientBinded", () => {
    const onClientBinded = jest.spyOn(playback, "onClientBinded");

    playback.setup();
    emitter.emit(client);
    expect(onClientBinded).toBeCalledWith(client);

    onClientBinded.mockClear();
  });
});
