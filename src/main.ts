import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { MainModule } from './main.module';

if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(MainModule);

if (module.hot) {
  import('./hmr').then(m => {
    console.log(m);
    m.hmrBootstrap(module, bootstrap);
  });
} else {
  bootstrap();
}
