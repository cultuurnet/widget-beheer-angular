import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {
  environment,
  setEnvironmentToConfig,
} from './environments/environment';

const main = async () => {
  await setEnvironmentToConfig();

  if (environment.production) {
    enableProdMode();
  }

  await platformBrowserDynamic().bootstrapModule(AppModule);
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
