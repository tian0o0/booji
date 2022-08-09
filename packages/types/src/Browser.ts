/**
 * 面包屑类型
 * @public
 */
export const enum BrowserBreadcrumbType {
  Http = "Http Request",
  User = "User Action",
  Route = "Route",
  Debug = "Debug",
  Error = "Error",
  Custom = "Custom",
}

/**
 * 面包屑分类
 * @public
 */
export const enum BrowserBreadcrumbCategory {
  Xhr = "Xhr",
  Fetch = "Fecth",
  Click = "Ui.Click",
  Console = "Console",
  History = "History",
  HashChange = "HashChange",
  ResourceLoadError = "Resource Load Error",
  CodeError = "Code Error",
  Unhandledrejection = "Unhandledrejection",
  CaptureMessage = "Booji.CaptureMessage",
  CaptureException = "Booji.CaptureException",
}

// export enum PlatformBreadcrumbCategory {
//   Vue = "Vue",
//   React = "React",
//   Mp = "Mp",
// }
