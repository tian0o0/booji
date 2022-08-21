import { Integration, Event, BreadcrumbItem } from ".";

/**
 * Booji基础配置项
 * @public
 */
export interface BaseOptions {
  /**
   * 是否开启 debug 模式，开启后 Booji 内部会启用 logger 打印日志
   * @defaultValue `false`
   */
  debug?: boolean;

  /**
   * 上报地址
   */
  dsn: string;

  /**
   * 在 Booji 开放平台上申请的 key，每个key对应一个项目
   */
  appKey: string;

  /**
   * 默认集成，如不启用请传 false
   * @defaultValue `true`
   */
  defaultIntegrations?: Integration[] | boolean;

  /**
   * 用于自定义集成
   */
  integrations?: Integration[];

  /**
   * 自定义钩子函数，用于在事件上报前修改事件
   *
   * 注意：如果返回null, 将忽略本次事件上报
   *
   * @param event - 上报的事件
   * @returns 修改后的事件/null
   */
  beforeReport?: (event: Event) => Promise<Event | null> | Event | null;

  /**
   * 是否开启性能监控, 开启后将在页面 performance 数据准备后发送一次请求
   * @defaultValue `false`
   */
  performance?: boolean;
  /**
   * release版本，用于寻找对应版本的 sourcemap
   * 如果不传，则默认寻找最新版本的 sourcemap
   */
  release?: string;
}

/**
 * 事件去重集成配置项
 * @public
 */
export interface DedupeOptions {
  /**
   * 是否开启事件去重机制
   * @defaultValue `true`
   */
  dedupe?: boolean;
}

/**
 * 过滤器集成配置项
 * @public
 */
export interface InboundFilterOptions {
  /**
   * 忽略上报的url集合，默认无限制
   */
  ignoreUrls?: Array<string | RegExp>;
  /**
   * 忽略上报的错误集合，默认无限制
   */
  ignoreErrors?: Array<string | RegExp>;
}

/**
 * 全局错误处理集成配置项
 * @public
 */
export interface GlobalHandlerOptions {
  /**
   * 是否开启onerror插装
   * @defaultValue `true`
   */
  onerror?: boolean;
  /**
   * 是否开启onunhandledrejection插装
   * @defaultValue `true`
   */
  onunhandledrejection?: boolean;
}

/**
 * 面包屑集成配置项
 * @public
 */
export interface BreadcrumbOptions {
  /**
   * 是否开启console插装
   * @defaultValue `false`
   */
  console?: boolean;
  /**
   * 是否开启dom插装
   * @defaultValue `true`
   */
  dom?: boolean;
  /**
   * 是否开启fetch插装
   * @defaultValue `true`
   */
  fetch?: boolean;
  /**
   * 是否开启xhr插装
   * @defaultValue `true`
   */
  xhr?: boolean;
  /**
   * 是否开启history插装
   * @defaultValue `true`
   */
  history?: boolean;
  /**
   * 是否开启hashchange插装
   * @defaultValue `true`
   */
  hashchange?: boolean;
  /**
   * 最大面包屑栈
   * @defaultValue 10
   */
  maxBreadcrumbs?: number;
  /**
   * 自定义钩子函数，用于在面包屑入栈时修改面包屑数据
   * 必须返回一个合法的面包屑数据。如果不希望修改面包屑数据，只需将其原样返回即可
   * 注意：如果返回null, 将忽略该面包屑
   *
   * @param breadcrumb - 面包屑数据
   * @returns 修改后的面包屑数据null
   */
  beforeAddBreadcrumb?: (breadcrumb: BreadcrumbItem) => BreadcrumbItem | null;
}

/**
 * 用户行为回放配置项
 * @public
 */
export interface PlaybackOptions {
  /**
   * 是否记录用户行为轨迹
   * @defaultValue `false`
   */
  playback?: boolean;
  /**
   * 最大回放数据量
   * @defaultValue 100
   */
  maxPlaybacks?: number;
}

/**
 * 是否开启Web Worker, 默认不开启
 * @public
 */
export interface WorkerOptions {
  worker?: {
    /**
     * Web Worker URL
     */
    url: string;
    /**
     * TODO: Web Worker 内部是否启用队列上报
     * @defaultValue `false`
     */
    queue?: boolean;
  };
}

/**
 * Vue 配置项
 * @public
 */
export interface VueOptions {
  /**
   * Vue2.x: Vue constructor
   */
  Vue?: any;
  /**
   * Vue3.x: Application Instance
   */
  app?: any;
}

/**
 * 核心通用配置项
 * @public
 */
export type CoreOptions = BaseOptions & DedupeOptions & InboundFilterOptions;

/**
 * 浏览器端配置项
 * @public
 */
export type BrowserOptions = CoreOptions &
  GlobalHandlerOptions &
  BreadcrumbOptions &
  PlaybackOptions &
  WorkerOptions &
  VueOptions;

/**
 * Node端配置项
 * @public
 */
export type NodeOptions = CoreOptions & GlobalHandlerOptions;

/**
 * 所有配置项
 * @internal
 */
export type Options = BrowserOptions & NodeOptions;
