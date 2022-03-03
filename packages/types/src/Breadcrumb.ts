import { Severity } from "./Severity";
/**
 * 面包屑
 * @public
 */
export interface BreadcrumbItem {
  type?: string;
  level?: Severity;
  category?: string;
  timestamp: number;
  data?: { [key: string]: any } | string;
}
