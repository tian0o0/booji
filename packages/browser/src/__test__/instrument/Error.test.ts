import { getCurrentHub } from "@booji/hub";
import { emitter } from "@booji/utils";
import { BrowserClient } from "../../Client";
import { ErrorInstrument } from "../../instrument";

describe("Console", () => {
  const hub = getCurrentHub();
  const options = {
    dsn: "https://api.qingtian.life/booji",
    appKey: "xxx",
  };
  const client = new BrowserClient(options);
  hub.bindClient(client);

  it("ErrorInstrument", () => {
    const spy = jest.spyOn(ErrorInstrument, "handle");

    emitter.on(
      jest.fn((data) => {
        expect(data).toBe(client);
        ErrorInstrument.setup();

        // const errorFn = jest.fn().mockImplementation(() => {
        //   throw new Error("error");
        // });
        // expect(() => errorFn()).toThrowError();
        // expect(errorFn).toBeCalled();
        // expect(spy).toBeCalled();

        spy.mockClear();
      })
    );
    emitter.emit(client);
  });
});
