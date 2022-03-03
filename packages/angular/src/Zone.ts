declare const Zone: any;

/**
 * Angular应用中的 `zone` 有两种使用形式：
 * 1.zone-full(即在 Angular 入口文件中 `import "zone.js"`)
 * 2.zone-less(不导入 `zone.js`)
 * 开发者可以不导入 `zone.js` 并且自己处理变更检测，前提是对Angular的变更检测特别熟悉，参考[NoopZone](https://angular.io/guide/zone#noopzone)
 */
const isNgZoneEnabled = typeof Zone !== "undefined" && !!Zone.current;

/**
 * 用于确保代码在 NgZone 之外运行，确保不会触发 Angular 的变更检测
 * @internal
 */
export function runOutsideAngular<T>(callback: () => T): T {
  // The `Zone.root.run` basically will run the `callback` in the most parent zone.
  // Any asynchronous API used inside the `callback` won't catch Angular's zone
  // since `Zone.current` will reference `Zone.root`.
  // The Angular's zone is forked from the `Zone.root`. In this case, `zone.js` won't
  // trigger change detection, and `ApplicationRef.tick()` will not be run.
  // Caretaker note: we're using `Zone.root` except `NgZone.runOutsideAngular` since this
  // will require injecting the `NgZone` facade. That will create a breaking change for
  // projects already using the `@sentry/angular`.
  return isNgZoneEnabled ? Zone.root.run(callback) : callback();
}
