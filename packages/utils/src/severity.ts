import { Severity, SeverityLevel, SeverityLevels } from "@booji/types";

function isSupportedSeverity(level: string): level is Severity {
  return SeverityLevels.indexOf(level as SeverityLevel) !== -1;
}
/**
 * Converts a string-based level into a Severity.
 *
 * @param level - string representation of Severity
 * @returns Severity
 * @public
 */
export function severityFromString(level: SeverityLevel | string): Severity {
  if (isSupportedSeverity(level)) {
    return level;
  }
  return Severity.Log;
}
