import * as keys from 'ramda/src/keys';
import * as forEach from 'ramda/src/forEach';
import * as curry from 'ramda/src/curry';

export function generateGetter<T, K extends keyof T>(instance: ViewModel<T>, key: K) {
  Object.defineProperty(instance, key, {
    get() {
      return instance.getProp(key);
    },
    configurable: false,
    enumerable: true,
  });
}

export abstract class ViewModel<T> {
  constructor(protected props: Partial<T> = {}) {
    Object.defineProperty(this, 'props', {
      enumerable: false,
      configurable: false,
    });

    const generatePostGetter = curry(generateGetter)(this);
    forEach(generatePostGetter, keys(props));
  }

  public getProp(key: string) {
    return (<any>this.props)[key];
  }
}
