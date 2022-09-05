## @booji/webpack-plugin

> 打包后上传SourceMap文件至Booji服务端

### 使用示例

```js
const BoojiWebpackPlugin = require('@booji/webpack-plugin');

const config = {
  plugins: [
    new BoojiWebpackPlugin({
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ4aWV0QDEzMy5jbiIsImV4cCI6MTY1MzM3NDI3OS45MzIsImlhdCI6MTY0ODE5MDI3OX0.MAe9O01oTeKxd83leG4nbWzgAjNeps3wzaUc7LopnaA",
      appKey: "9663a0fa-aec3-441e-85eb-461d66ae1ec3",
      release: "1.0.1",
      reportUrl: "http://localhost:3333/api/booji/sourcemap",
    }),
  ],
};
```