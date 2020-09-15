import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { RatingComponent } from './rating/rating.component';
import { TopMenuButtonComponent } from './top-menu-button/top-menu-button.component';
import { FilterComponent } from './filter/filter.component';
import { FilterFieldComponent } from './filter-field/filter-field.component';

@NgModule({
  declarations: [
    RatingComponent,
    ImageSliderComponent,
    TopMenuButtonComponent,
    FilterComponent,
    FilterFieldComponent
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
    FilterFieldComponent
  ]
})
export class SharedModule { }
