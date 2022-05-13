import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {
  environment,
  setEnvironmentFromConfig,
} from './environments/environment';

const main = async () => {
  await setEnvironmentFromConfig();

  if (environment.production) {
    enableProdMode();
  }

  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(
      () => {},
      () => {}
    );
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
