/**
 * 重写对象上面的某个属性
 *
 * @param source - 需要被重写的对象
 * @param name - 需要被重写对象的key
 * @param replacement - 以原有的函数作为参数，执行并重写原有函数
 * @param force - 是否强制重写（可能原先没有该属性）
 * @public
 */
export function rewrite(
  source: { [key: string]: any },
  name: string,
  replacement: (...args: any[]) => any,
  force = false
): void {
  if (name in source || force) {
    const original = source[name];
    const wrapped = replacement(original);
    if (typeof wrapped === "function") {
      source[name] = wrapped;
    }
  }
}
