import { Global } from "./global";
import { logger } from "./logger";
import { uuid4 } from "./uuid";

const USER_ID = "BoojiUserId";

/**
 * 生成唯一userId, 用于统计错误影响的用户数量
 * @return string | undefined
 * @public
 */
export function createUserId(): string | undefined {
  if (!Global.sessionStorage) {
    logger.warn("当前环境不支持 sessionStorage");
    return;
  }
  const BoojiUserId = Global.sessionStorage.getItem(USER_ID);
  let uuid;
  if (!BoojiUserId) {
    uuid = uuid4();
    Global.sessionStorage.setItem(USER_ID, uuid);
  } else {
    uuid = BoojiUserId;
  }
  return uuid;
}
