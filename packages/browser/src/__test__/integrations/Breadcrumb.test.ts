import { emitter } from "@booji/utils";
import { BrowserClient } from "../../Client";
import { BreadcrumbIntegration } from "../../integrations";

describe("Breadcrumb", () => {
  const options = {
    dsn: "https://api.qingtian.life/booji",
    appKey: "xxx",
  };
  const client = new BrowserClient(options);
  const breadcrumb = new BreadcrumbIntegration();

  it("onClientBinded", () => {
    const onClientBinded = jest.spyOn(breadcrumb, "onClientBinded");

    breadcrumb.setup();
    emitter.emit(client);
    expect(onClientBinded).toBeCalledWith(client);

    onClientBinded.mockClear();
  });
});
