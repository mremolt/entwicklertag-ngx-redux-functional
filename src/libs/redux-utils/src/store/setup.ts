import {
  applyMiddleware,
  compose,
  createStore,
  Reducer,
  Middleware,
  Store,
  GenericStoreEnhancer,
} from 'redux';

export function setupStore<T>(
  rootReducer: Reducer<T>,
  initialState: T,
  middleware: Middleware[] = [],
  enhancers: GenericStoreEnhancer[] = []
): Store<T> {
  return createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), ...enhancers));
}
