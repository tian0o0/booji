import { getCurrentHub } from "@booji/hub";
import { emitter } from "@booji/utils";
import { BrowserClient } from "../../Client";
import { ConsoleInstrument } from "../../instrument";

describe("Console", () => {
  const hub = getCurrentHub();
  const options = {
    dsn: "https://api.qingtian.life/booji",
    appKey: "xxx",
  };
  const client = new BrowserClient(options);
  hub.bindClient(client);

  it("works", () => {
    const spy = jest.spyOn(ConsoleInstrument, "handle");
    emitter.on(
      jest.fn((data) => {
        expect(data).toBe(client);
        ConsoleInstrument.setup();
        console.log("trigger");
        expect(spy).toBeCalled();
        spy.mockClear();
      })
    );
    emitter.emit(client);
  });
});
