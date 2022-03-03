import {
  BrowserBreadcrumbCategory,
  BrowserBreadcrumbType,
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
    type: BrowserBreadcrumbType.Custom,
    category: BrowserBreadcrumbCategory.CaptureMessage,
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
    type: BrowserBreadcrumbType.Error,
    category: BrowserBreadcrumbCategory.CaptureException,
    level,
    message: typeof exception === "string" ? exception : exception.message,
    timestamp: Date.now(),
  };
}
