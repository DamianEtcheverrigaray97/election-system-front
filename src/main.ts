import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { InterceptService } from './app/services/intercept.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const config = {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    importProvidersFrom(
      HttpClientModule,               
      ToastrModule.forRoot(),         
      BrowserAnimationsModule        
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true  
    }
  ]
};

bootstrapApplication(AppComponent, config)
  .catch((err) => console.error(err));