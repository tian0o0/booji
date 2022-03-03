import {
  BrowserBreadcrumbCategory,
  BrowserBreadcrumbType,
  Event,
  Severity,
} from "@booji/types";
import { Global } from "@booji/utils";
import { getCurrentHub } from "@booji/hub";
interface ResourceLoadErrorTarget extends EventTarget {
  tagName?: string;
  src?: string;
  href?: string;
}

/**
 * Error插装，用于监听资源加载错误和代码运行时错误
 * @internal
 */
export class ErrorInstrument {
  static setup(): void {
    Global.addEventListener(
      "error",
      (e: ErrorEvent) => {
        ErrorInstrument.handle(e);
      },
      true
    );
  }
  static handle(event: ErrorEvent): void {
    const target = event.target as ResourceLoadErrorTarget;
    if (target.tagName) {
      // 处理资源加载错误
      handleResourceLoadError(target);
    } else {
      // 处理代码运行时错误
      handleCodeError(event);
    }
  }
}

function generateMessage(target: ResourceLoadErrorTarget): string {
  switch (target.tagName) {
    case "IMG":
      return `IMG资源加载失败：${target.src}`;
    case "SCRIPT":
      return `JS资源加载失败：${target.src}`;
    case "LINK":
      return `CSS资源加载失败：${target.href}`;
    default:
      return "资源加载失败";
  }
}

function handleResourceLoadError(target: ResourceLoadErrorTarget) {
  const r: Event = {
    type: BrowserBreadcrumbType.Error,
    category: BrowserBreadcrumbCategory.ResourceLoadError,
    level: Severity.Error,
    message: generateMessage(target),
    timestamp: Date.now(),
  };
  getCurrentHub().captureEvent(r);
}

function handleCodeError(event: ErrorEvent) {
  const { message, filename, lineno, colno, error } = event;
  const r: Event = {
    type: BrowserBreadcrumbType.Error,
    category: BrowserBreadcrumbCategory.CodeError,
    level: Severity.Error,
    message: `${message} at ${filename}, ${lineno}行, ${colno}列`,
    timestamp: Date.now(),
    // stack: error.stack,
  };
  getCurrentHub().captureEvent(r);
}
