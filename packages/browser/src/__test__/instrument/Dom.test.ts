import { getCurrentHub } from "@booji/hub";
import { emitter } from "@booji/utils";
import { BrowserClient } from "../../Client";
import { DomInstrument } from "../../instrument";

describe("Console", () => {
  const hub = getCurrentHub();
  const options = {
    dsn: "https://api.qingtian.life/booji",
    appKey: "xxx",
  };
  const client = new BrowserClient(options);
  hub.bindClient(client);

  it("works", () => {
    const spy = jest.spyOn(DomInstrument, "handle");
    emitter.on(
      jest.fn((data) => {
        expect(data).toBe(client);
        DomInstrument.setup();
        document.body.innerHTML = "<button id='button'>test</button>";
        document.getElementById("button")?.click();
        expect(spy).toBeCalled();
        spy.mockClear();
      })
    );
    emitter.emit(client);
  });
});
