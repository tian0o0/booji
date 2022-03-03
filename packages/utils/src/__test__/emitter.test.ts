import { Emitter } from "..";

describe("emitter", () => {
  it("should listen correctly", () => {
    const emitter = new Emitter<string>();
    const params = "params passed by emitter";

    const callback = jest.fn((data) => {
      expect(data).toBe(params);
    });
    const callback2 = jest.fn((data) => {
      expect(data).toBe(params);
    });

    emitter.on(callback);
    emitter.on(callback2);

    emitter.emit(params);
  });

  it("should listen only once", () => {
    const emitter = new Emitter<string>();
    const params = "params passed by emitter";

    const callback = jest.fn((data) => {
      expect(data).toBe(params);
    });
    const callback2 = jest.fn((data) => {
      expect(data).toBe(params);
    });

    emitter.once(callback);
    emitter.once(callback2);

    emitter.emit(params);
    emitter.emit(params);

    expect(callback.mock.calls.length).toBe(1);
    expect(callback2.mock.calls.length).toBe(1);
  });
});
