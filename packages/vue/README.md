## @booji/vue

> Vue端SDK，本包在 `@booji/browser` 的基础上添加了Vue的集成，用于拦截Vue2.x 和 Vue3.x 的错误

### 使用示例

#### Vue2.x

```ts
import Vue from "vue"
import { init } from "@booji/vue"

init({
  Vue,
  dsn: "xxx",
  appKey: "xxx"
})

new Vue({
  // ...
})
```

#### Vue3.x
```ts
import { init } from "@booji/vue"

const app = createApp({ //... })

init({
  app,
  dsn: "xxx",
  appKey: "xxx"
})
```