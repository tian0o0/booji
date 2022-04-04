/**
 * 等级枚举
 * @public
 */
export enum Severity {
  Critical = "critical",
  Error = "error",
  Warn = "warn",
  Info = "info",
  Log = "log",
}

/**
 * 等级数组
 * @public
 */
export const SeverityLevels = [
  "critical",
  "error",
  "warn",
  "info",
  "log",
] as const;

/**
 * 等级类型
 * @public
 */
export type SeverityLevel = typeof SeverityLevels[number];
