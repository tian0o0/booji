import { Event, User } from "@booji/types";

/**
 * 生成 32 bit FNV-1a hash
 *
 * @param str - 输入字符串
 * @returns string
 */
function hash(str: string) {
  let hval = 0x811c9dc5;
  for (var i = 0; i < str.length; ++i) {
    hval ^= str.charCodeAt(i);
    hval +=
      (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
  }
  return (hval >>> 0).toString(16);
}

/**
 * 根据 event 生成 hash
 * @param event - {@link @booji/types#Event}
 * @param identifier - 用户唯一标识，用于生成eventHash {@link @booji/types#User}
 * @returns string
 * @public
 */
export function createHash(event: Event, identifier?: User): string {
  const s = identifier
    ? `${event.message} ${identifier.id || identifier.email || identifier.name}`
    : event.message;
  return hash(s as string);
}
