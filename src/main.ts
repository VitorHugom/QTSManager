import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { NgrokInterceptor } from './app/services/ngrok.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: NgrokInterceptor, multi: true }
  ]
}).catch(err => console.error(err));
