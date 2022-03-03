import { uuid4 } from "..";

describe("uuid", () => {
  it("should return uuid4 correctly", () => {
    expect(uuid4().length).toBe(32);
  });

  it("should return uuid4 correctly when support crypto", () => {
    Object.defineProperty(window, "crypto", {
      value: {
        getRandomValues: jest.fn().mockReturnValueOnce(new Uint32Array(10)),
      },
    });

    expect(uuid4().length).toBe(32);
  });
});
