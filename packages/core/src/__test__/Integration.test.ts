import { Integration, Options } from "@booji/types";
import { CoreIntegrations } from "..";
import { setupIntegrations } from "../Integration";

describe("setupIntegrations", () => {
  it("setupIntegrations", () => {
    class CustomIntegration implements Integration {
      name: string = "DedupeIntegration";
      setup(): void {}
    }
    const options: Options = {
      dsn: "xxx",
      appKey: "xxx",
      integrations: [new CustomIntegration()],
      defaultIntegrations: [new CoreIntegrations.DedupeIntegration()],
    };
    setupIntegrations(options);
  });
});
