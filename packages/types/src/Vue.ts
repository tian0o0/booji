/**
 * Vue constructor
 * @public
 */
export interface Vue {
  config: any;
}

/**
 * Vue instance
 * @public
 */
export interface ViewModel {
  $root: ViewModel;
  $parent: ViewModel;
  $options: any;
}
