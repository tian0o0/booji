import { severityFromString } from "..";

describe("severity", () => {
  it("should return severity correctly", () => {
    expect(severityFromString("error")).toBe("error");
    expect(severityFromString("eee")).toBe("log");
  });
});
