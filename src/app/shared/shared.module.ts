import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { RatingComponent } from './rating/rating.component';
import { TopMenuButtonComponent } from './top-menu-button/top-menu-button.component';
import { FilterComponent } from './filter/filter.component';
import { FilterByComponent } from './filter-by/filter-by.component';

@NgModule({
  declarations: [
    RatingComponent,
    ImageSliderComponent,
    TopMenuButtonComponent,
    FilterComponent,
    FilterByComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    RatingComponent,
    ImageSliderComponent,
    TopMenuButtonComponent,
    FilterComponent,
  ]
})
export class SharedModule { }
