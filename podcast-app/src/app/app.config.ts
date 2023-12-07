import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { APP_INITIALIZER } from '@angular/core';
import { ConfigService } from './core/service/config.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(HttpClientModule), {
    provide: APP_INITIALIZER,
    multi: true,
    deps: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return () => {
        return configService.loadConfig();
      };
    }
  }, NgbActiveModal ]
};
