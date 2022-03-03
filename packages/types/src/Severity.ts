/**
 * 等级枚举
 * @public
 */
export enum Severity {
  Error = "error",
  Warn = "warn",
  Log = "log",
  Info = "info",
  Debug = "debug",
  Critical = "critical",
  Fatal = "fatal",
}

/**
 * 等级数组
 * @public
 */
export const SeverityLevels = [
  "error",
  "warning",
  "log",
  "info",
  "debug",
  "critical",
  "fatal",
] as const;

/**
 * 等级类型
 * @public
 */
export type SeverityLevel = typeof SeverityLevels[number];
