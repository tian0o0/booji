import { BreadcrumbOptions, Client, Integration } from "@booji/types";
import { emitter } from "@booji/utils";
import {
  ConsoleInstrument,
  DomInstrument,
  XhrInstrument,
  FetchInstrument,
  HistoryInstrument,
  HashChangeInstrument,
} from "../instrument";

/**
 *
 * 面包屑集成
 * @remarks
 * 实现了 {@link @booji/types#Integration} 接口
 * @public
 */
export class BreadcrumbIntegration implements Integration {
  /**
   * {@inheritDoc @booji/types#Integration.name}
   */
  name: string = "BreadcrumbIntegration";

  /**
   * {@inheritDoc  @booji/types#Integration.setup}
   */
  setup() {
    emitter.once(this.onClientBinded);
  }

  /**
   * {@inheritDoc  @booji/types#Integration.onClientBinded}
   */
  onClientBinded(client: Client) {
    const {
      console = false,
      dom = true,
      fetch = true,
      xhr = true,
      history = true,
      hashchange = true,
    }: BreadcrumbOptions = client.getOptions();

    console && ConsoleInstrument.setup();
    dom && DomInstrument.setup();
    xhr && XhrInstrument.setup();
    fetch && FetchInstrument.setup();
    history && HistoryInstrument.setup();
    hashchange && HashChangeInstrument.setup();
  }
}
