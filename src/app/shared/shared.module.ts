import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
// import { ImageSliderComponent } from './image-slider/image-slider.component';
import { RatingComponent } from './rating/rating.component';
import { TopMenuButtonComponent } from './top-menu-button/top-menu-button.component';
import { FilterComponent } from './filter/filter.component';
import { PropertyFilterPipe } from './property-filter.pipe';
import { FilterByPipe } from './filter-by.pipe';
import { NgImageSliderModule } from 'ng-image-slider';


@NgModule({
  declarations: [
    RatingComponent,
    // ImageSliderComponent,
    TopMenuButtonComponent,
    FilterComponent,
    PropertyFilterPipe,
    FilterByPipe,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgImageSliderModule
  ],
  exports: [
    RatingComponent,
    // ImageSliderComponent,
    TopMenuButtonComponent,
    FilterComponent,
    PropertyFilterPipe,
    FilterByPipe,
    NgImageSliderModule
  ]
})
export class SharedModule { }
