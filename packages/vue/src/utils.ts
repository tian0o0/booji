import { ViewModel } from "@booji/types";

const ROOT_COMPONENT_NAME = "<Root>";
const ANONYMOUS_COMPONENT_NAME = "<Anonymous>";
// Vendored directly from https://github.com/vuejs/vue/blob/master/src/core/util/debug.js with types only changes.
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str: string): string =>
  str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");

/**
 * 获取Vue组件名
 * @returns string
 * @internal
 */
export function formatComponentName(
  vm: ViewModel,
  includeFile: boolean = true
): string {
  if (!vm) {
    return ANONYMOUS_COMPONENT_NAME;
  }

  if (vm.$root === vm) {
    return ROOT_COMPONENT_NAME;
  }

  const options = vm.$options;

  let name = options.name || options._componentTag;
  const file = options.__file;
  if (!name && file) {
    const match = file.match(/([^/\\]+)\.vue$/);
    if (match) {
      name = match[1];
    }
  }

  return (
    (name ? `<${classify(name)}>` : ANONYMOUS_COMPONENT_NAME) +
    (file && includeFile !== false ? ` at ${file}` : ``)
  );
}
