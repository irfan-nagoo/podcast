import { provideHttpClient, withFetch } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from './core/service/config.service';

import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withFetch()), {
    provide: APP_INITIALIZER,
    multi: true,
    deps: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return () => {
        return configService.loadConfig();
      };
    }
  }, NgbActiveModal, provideClientHydration(withHttpTransferCacheOptions({ includePostRequests: true, }))]
};
