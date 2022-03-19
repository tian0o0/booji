/**
 * @public
 */
export interface Performance {
  /**
   * DNS解析时间(如果是重用连接或是使用了本地 DNS 数据缓存的话，此值为 0)
   */
  dns: number;
  /**
   * TCP建立时间(如果是走 HTTPS 协议，中间还多一步 TLS 协商生成会话密钥的过程)
   */
  tcp: number;
  /**
   * request请求耗时
   */
  request: number;
  /**
   * response请求耗时
   */
  response: number;
  /**
   * dom解析耗时
   */
  processing: number;
  /**
   * 页面资源加载耗时
   */
  load: number;
}
