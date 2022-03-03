## @booji/react

> React端SDK，本包在 `@booji/browser` 的基础上添加了React的集成，用于拦截 React 的错误

### 使用示例

#### 入口文件

```tsx
import React from "react"
import ReactDOM from "react-dom";
import Booji from "@booji/react"

Booji.init({
  dsn: "xxx",
  appKey: "xxx"
})

ReactDOM.render(<App />, document.getElementById('root'));
```

#### ErrorBoundary
点击这里了解 React 的 [ErrorBoundary](https://reactjs.org/docs/error-boundaries.html)

```tsx
import { ErrorBoundary } from '@booji/react'

export default function FunctionalComponent() {
  const onError = (error: Error, componentStack: string) => {
    // 处理错误
  }
  const fallbackView = <p>出错啦，现在加载的是兜底视图</p>;
  return (
    <>
      <ErrorBoundary onError={onError} fallback={fallbackView}>
        <ComponentWithError />
      </ErrorBoundary>
    </>
  )
}
```