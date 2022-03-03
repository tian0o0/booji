## @booji/angular

> Angular端SDK，本包在 `@booji/browser` 的基础上添加了Angular的集成，用于拦截 Angular 的错误（不支持 Angular1.x）

### 使用示例

#### 入口文件

```ts
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import Booji from '@booji/angular';

import { AppModule } from './app/app.module';

Booji.init({
  dsn: "xxx",
  appKey: "xxx"
});

// ...

enableProdMode();
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(success => console.log(`Bootstrap success`))
  .catch(err => console.error(err));
```

#### ErrorHandler

```ts
import { NgModule, ErrorHandler } from '@angular/core';
import { BoojiErrorHandler } from '@booji/angular';

@NgModule({
  // ...
  providers: [
    {
      provide: ErrorHandler,
      useClass: BoojiErrorHandler,
    },
  ],
  // ...
})
export class AppModule {}
```