import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import Environment from './environment';

const env: any = new Environment();

if ('serviceWorker' in window.navigator) {
  OfflinePluginRuntime.install({
    onUpdateReady() {
      console.log('SW Event:', 'onUpdateReady');
      OfflinePluginRuntime.applyUpdate();
    },
    onUpdated() {
      switch (env.autoUpdate) {
        case 'always':
          window.location.reload();
          break;
        case 'confirm':
          if (window.confirm(env.updateMessage)) {
            window.location.reload();
          }
          break;
      }
    }
  });
}
