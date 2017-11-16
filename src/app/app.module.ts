/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2FileInputModule } from 'ng2-file-input'
import { TagInputModule } from 'ngx-chips';
import { SWSpinnerComponent } from 'app/@swastika-io/components/spinner/spinner.component';
import { ServiceHelper } from 'app/@swastika-io/helpers/sw.service.helper';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NotificationService } from 'app/@swastika-io/helpers/notifications.service';
import { ToasterModule, ToastComponent } from 'angular2-toaster';
import { WebStorageModule } from 'ngx-store';
import { StorageService } from 'app/@swastika-io/helpers/localStorage.service';
@NgModule({
  declarations: [AppComponent, SWSpinnerComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    WebStorageModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    
    Ng4LoadingSpinnerModule,
    Ng2FileInputModule.forRoot(
      {
        dropText: "Drop file here",
        browseText: "Browse",
        removeText: "Remove",
        invalidFileText: "You have picked an invalid or disallowed file.",
        invalidFileTimeout: 8000,
        removable: true,
        multiple: false,
        showPreviews: false,
        extensions: ['jpg','gif', 'png', 'xlsx'],
      }
    ),

    ToasterModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    ServiceHelper,
    NotificationService,
    StorageService,
  ],
})
export class AppModule {
}
