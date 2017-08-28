import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';

import { MainModuleNgFactory } from '../compiled/src/main.module.ngfactory';

enableProdMode();
platformBrowser().bootstrapModuleFactory(MainModuleNgFactory);
