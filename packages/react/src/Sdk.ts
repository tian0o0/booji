import { init as browserInit } from "@booji/browser";
import { Options } from "@booji/types";

/**
 * React Init SDK
 * @param option - {@link @booji/types#Options}
 * @public
 */
export function init(options: Options) {
  browserInit(options);
}
