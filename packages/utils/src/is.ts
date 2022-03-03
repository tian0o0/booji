const objectToString = Object.prototype.toString;

/**
 * 判断是否为Error
 *
 * @param what - 被检测值
 * @returns boolean
 * @public
 */
export function isError(what: unknown): boolean {
  switch (objectToString.call(what)) {
    case "[object Error]":
    case "[object Exception]":
    case "[object DOMException]":
      return true;
    default:
      return isInstanceOf(what, Error);
  }
}
/**
 * 判断被检测值是否是给定类型的实例
 *
 * @param what - 被检测值
 * @param base - 给定的类型
 * @returns boolean
 * @public
 */
export function isInstanceOf(what: unknown, base: any): boolean {
  try {
    return what instanceof base;
  } catch (_e) {
    /* istanbul ignore next */
    return false;
  }
}

/**
 * @public
 */
function isBuiltin(what: unknown, type: string): boolean {
  return Object.prototype.toString.call(what) === `[object ${type}]`;
}

/**
 * @public
 */
export function isUndef(v: any): boolean {
  return v === undefined || v === null;
}

/**
 * 判断是否为字符串
 *
 * @param what - 被检测值
 * @returns boolean
 * @public
 */
export function isString(what: unknown): boolean {
  return isBuiltin(what, "String");
}

/**
 * 判断是否为正则
 * @param what - 被检测值
 * @returns boolean
 * @public
 */
export function isRegExp(what: unknown): what is RegExp {
  return isBuiltin(what, "RegExp");
}

/**
 * 模式匹配
 * @param value - 被检测值
 * @param pattern - RegExp ｜ string
 * @public
 */
export function isMatchingPattern(
  value: string,
  pattern: RegExp | string
): boolean {
  if (isRegExp(pattern)) {
    return (pattern as RegExp).test(value);
  }
  if (typeof pattern === "string") {
    return value.indexOf(pattern) !== -1;
  }
  /* istanbul ignore next */
  return false;
}
