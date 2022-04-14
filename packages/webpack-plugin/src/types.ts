/**
 * BoojiWebpackPligin配置项
 * @public
 */
export interface Options {
  /**
   * Booji开放平台token，用于上传sourcemap文件名
   */
  token: string;
  /**
   * 项目唯一标识
   */
  appKey: string;
  /**
   * 版本号，不同版本号对应不同的sourcemap
   */
  release: string;
  /**
   * sourcemap静态资源所托管的cdn
   */
  url: string;
  /**
   * 上传sourcemap文件名的接口
   */
  reportUrl: string;
}
