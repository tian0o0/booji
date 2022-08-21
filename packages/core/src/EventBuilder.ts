import {
  BreadcrumbCategory,
  BreadcrumbType,
  Event,
  Severity,
} from "@booji/types";

/**
 * 将 Booji.captureMessage()捕获的消息 转为 Event类型
 * @param message - 消息
 * @param level - {@link @booji/types#Severity}
 * @returns {@link @booji/types#Event}
 * @internal
 */
export function createEventFromMessage(
  message: string,
  level: Severity = Severity.Info
): Event {
  return {
    type: BreadcrumbType.Custom,
    category: BreadcrumbCategory.CaptureMessage,
    level,
    message,
    timestamp: Date.now(),
  };
}

/**
 * 将 Booji.captureException()捕获的异常 转为 Event类型
 * @param error - 异常
 * @param level - {@link @booji/types#Severity}
 * @returns {@link @booji/types#Event}
 * @internal
 */
export function createEventFromException(
  exception: Error | string,
  level: Severity = Severity.Error
): Event {
  return {
    type: BreadcrumbType.Error,
    category: BreadcrumbCategory.CaptureException,
    level,
    message: typeof exception === "string" ? exception : exception.message,
    timestamp: Date.now(),
  };
}
