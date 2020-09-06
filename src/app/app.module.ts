import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { PropertyItemComponent } from './property/property-item/property-item.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { FeaturedComponent } from './property/featured/featured.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { UserLineComponent } from './user/user-line/user-line.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { RatingComponent } from './rating/rating.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PropertyItemComponent,
    PropertyListComponent,
    PropertyDetailComponent,
    FeaturedComponent,
    ImageSliderComponent,
    UserLineComponent,
    UserDetailComponent,
    RatingComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
