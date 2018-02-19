import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

if (module.hot) {
  import('./hmr').then(m => {
    m.hmrBootstrap(module, bootstrap);
  });
} else {
  bootstrap();
}
