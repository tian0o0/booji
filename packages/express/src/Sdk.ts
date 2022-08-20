import { init as nodeInit } from "@booji/node";
import { Options } from "@booji/types";

/**
 * Express Init SDK
 * @param option - {@link @booji/types#Options}
 * @public
 */
export function init(options: Options) {
  nodeInit(options);
}
