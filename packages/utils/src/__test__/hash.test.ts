import { Event } from "packages/types/src";
import { createHash } from "..";

describe("hash code", () => {
  it("should create issueId/eventHash correctly", () => {
    const event: Event = {
      message: "an error",
    };
    const issueId = createHash(event);
    const eventHash = createHash(event, { name: "admin" });

    expect(issueId.length).toBe(8);
    expect(eventHash.length).toBe(8);
    expect(issueId).not.toBe(eventHash);
  });
});
