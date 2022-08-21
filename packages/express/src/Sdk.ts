import { init as nodeInit } from "@booji/node";
import { NodeOptions } from "@booji/types";

/**
 * Express Init SDK
 * @param option - {@link @booji/types#Options}
 * @public
 */
export function init(options: NodeOptions) {
  nodeInit(options);
}
