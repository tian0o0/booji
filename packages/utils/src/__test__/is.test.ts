import { isError, isMatchingPattern, isRegExp, isUndef } from "..";

describe("is", () => {
  it("isError", () => {
    expect(isError(new Error())).toBe(true);
    expect(isError(1)).toBe(false);
  });

  it("isUndef", () => {
    expect(isUndef(null)).toBe(true);
    expect(isUndef(undefined)).toBe(true);
    expect(isUndef(1)).toBe(false);
  });

  it("isRegExp", () => {
    expect(isRegExp(new RegExp(/abc/))).toBe(true);
    expect(isRegExp(1)).toBe(false);
  });

  it("isMatchingPattern", () => {
    expect(isMatchingPattern("http://localhost:8080", /localhost/)).toBe(true);
    expect(isMatchingPattern("http://localhost:8080", "localhost")).toBe(true);
  });
});
