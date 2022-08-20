## @booji/express

> Express端SDK，本包在 `@booji/node` 的基础上添加了Express的中间件

### 使用示例

> 点击这里了解 Express 的 [ErrorHandler](http://expressjs.com/en/guide/error-handling.html)

```ts
import express from "express";
import { init, ErrorHandler } from "@booji/node"

// 使用CommonJS
// const express = require('express');
// const { init } = require('@booji/node');

const app = express();

init({
  dsn: "xxx",
  appKey: "xxx"
})

app.use('/', rootHandler);
app.use('/other', otherHandler);

// Booji错误中间件必须在`所有控制器后`使用
app.use(ErrorHandler);

// 可选：如果Booji错误中间件无法满足需求，也可以自定义错误中间件
app.use((err, req, res, next) => {
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000);
```