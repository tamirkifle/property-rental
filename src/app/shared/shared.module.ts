import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { RatingComponent } from './rating/rating.component';
import { TopMenuButtonComponent } from './top-menu-button/top-menu-button.component';

@NgModule({
  declarations: [
    RatingComponent,
    ImageSliderComponent,
    TopMenuButtonComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    RatingComponent,
    ImageSliderComponent,
    TopMenuButtonComponent,
  ]
})
export class SharedModule { }
