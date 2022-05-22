<h1 align="center">Booji.js</h1>
<div align="center">
<img src="https://raw.githubusercontent.com/tian0o0/pic/master/icon.png" width="80">

</div>

<p align="center">A progressive front-end monitor SDK for Web Application.</p>

<p align="center">
<a href="https://github.com/tian0o0/booji/tags"><img src="https://img.shields.io/github/v/tag/tian0o0/booji?logo=github&style=for-the-badge"/></a>
<a href="https://github.com/tian0o0/booji/actions"><img src="https://img.shields.io/github/workflow/status/tian0o0/booji/Deploy?logo=github&style=for-the-badge"/></a>
<a href="https://app.codecov.io/gh/tian0o0/booji/"><img src="https://img.shields.io/codecov/c/github/tian0o0/booji/master?logo=codecov&style=for-the-badge"/></a>
<a href="https://space.bilibili.com/7230077"><img src="https://img.shields.io/badge/B站-来干杯鸭-f3f3f3?logo=bilibili&labelColor=ff69b4&logoColor=white&style=for-the-badge"/></a>
</p>

### Features
- :gift: **Rich Integrations and Out of the box**
- :art: **Highly Customizable**
- :rainbow: **Support `Vue`/`Angular`/`React`**
- :rocket: **Available reporting in `Web Worker` to avoid block the main thread**

### Quick Start
```ts
import { init } from "@booji/browser"

init({
  dsn: "__DSN__",
  appKey: "__KEY__"
})
```

### Demo
I have prepared some demos at `stackblitz`:
- [x] [IIFE DEMO](https://stackblitz.com/edit/booji-iife?file=index.html)
- [x] [React DEMO](https://stackblitz.com/edit/booji-react?file=index.tsx)
- [x] [Angular DEMO](https://stackblitz.com/edit/booji-angular?file=src/app/app.module.ts)
- [x] [Vue2 DEMO](https://stackblitz.com/edit/booji-vue2?file=src/main.js)
- [x] [Vue3 DEMO](https://stackblitz.com/edit/booji-vue3?file=src/main.js)

### API Reference

Please see [API DOCS](https://tian0o0.github.io/booji/)

### Architecture

#### Client Side
![](https://raw.githubusercontent.com/tian0o0/pic/master/20220521181712.png)

#### Server Side
![](https://raw.githubusercontent.com/tian0o0/pic/master/20220521181739.png)

### Changelogs

Please see [CHANGELOG.md](https://github.com/tian0o0/booji/blob/master/CHANGELOG.md)

### Questions

Please see [FAQ.md](https://github.com/tian0o0/booji/blob/master/FAQ.md)
