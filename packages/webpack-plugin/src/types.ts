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
   * 上传sourcemap文件名的接口
   */
  reportUrl: string;

  /**
   * sourcemap静态资源所托管的cdn
   * @internal
   */
  cdn?: string;
  /**
   * ali-oss配置
   * @internal
   */
  oss?: OSSOptions;
}

/**
 * @internal
 */
export interface OSSOptions {
  accessKeyId: string;
  accessKeySecret: string;
  region: string;
  bucket: string;
}
