import { logger } from "..";

describe("ligger", () => {
  it("should logger correctly", () => {
    expect(logger.isEnabled).toBe(false);
    logger.enable();
    expect(logger.isEnabled).toBe(true);
    logger.disable();
    expect(logger.isEnabled).toBe(false);
  });
});
