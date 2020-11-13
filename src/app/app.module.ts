import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PropertyModule } from './property/property.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // ),
    PropertyModule,
    AdminModule,
    AuthModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,

  ],
  providers: [
    // { provide: BUCKET, useValue: 'my-bucket-name' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
