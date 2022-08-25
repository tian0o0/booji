import { Options } from "@booji/types";
import { init } from "../Sdk";

describe("Sdk", () => {
  it("Init", () => {
    const options = {
      dsn: "https://api.qingtian.life/booji",
      appKey: "xxx",
    };
    init(options);
  });

  it("Init error", () => {
    const options = {
      dsn: "https://api.qingtian.life/booji",
    } as Options;
    try {
      init(options);
    } catch (e: any) {
      expect(e.message).toBe("缺少初始化参数");
    }
  });
});
