import { getCurrentHub } from "@booji/hub";
import { emitter } from "@booji/utils";
import { BrowserClient } from "../../Client";
import { XhrInstrument } from "../../instrument";

describe("Xhr", () => {
  const hub = getCurrentHub();
  const options = {
    dsn: "https://api.qingtian.life/booji",
    appKey: "xxx",
  };
  const client = new BrowserClient(options);
  hub.bindClient(client);

  it("XhrInstrument", () => {
    const spy = jest.spyOn(XhrInstrument, "handle");

    emitter.on(
      jest.fn((data) => {
        expect(data).toBe(client);
        XhrInstrument.setup();

        const xhr = new window.XMLHttpRequest();
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            expect(spy).toBeCalled();
          }
        };
        xhr.open("GET", "http://localhost:3000/api/booji/health");

        xhr.send();

        spy.mockClear();
      })
    );
    emitter.emit(client);
  });
});
