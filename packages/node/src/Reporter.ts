import { CoreReporter } from "@booji/core";
import { Event } from "@booji/types";

/**
 * Node端上报中心，继承自 {@link @booji/core#CoreClient}
 */
export class NodeReporter extends CoreReporter {
  report(event: Event): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
