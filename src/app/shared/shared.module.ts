import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { RatingComponent } from './rating/rating.component';

@NgModule({
  declarations: [
    RatingComponent,
    ImageSliderComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    RatingComponent,
    ImageSliderComponent,
  ]
})
export class SharedModule { }
