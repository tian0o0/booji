import { getCurrentHub } from "@booji/hub";
import { emitter } from "@booji/utils";
import { BrowserClient } from "../../Client";
import { FetchInstrument } from "../../instrument";
import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

describe("Fetch", () => {
  const hub = getCurrentHub();
  const options = {
    dsn: "https://api.qingtian.life/booji",
    appKey: "xxx",
  };
  const client = new BrowserClient(options);
  hub.bindClient(client);

  it("FetchInstrument", () => {
    const spy = jest.spyOn(FetchInstrument, "handle");

    emitter.on(
      jest.fn((data) => {
        expect(data).toBe(client);
        FetchInstrument.setup();

        fetch("http://localhost:3000/api/booji/health")
          .then(() => {
            expect(spy).toBeCalled();
          })
          .catch((e) => {});

        spy.mockClear();
      })
    );
    emitter.emit(client);
  });
});
