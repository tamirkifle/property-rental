import { Pipe, PipeTransform } from '@angular/core';
import { Property } from '../property/property';

@Pipe({
  name: 'filterBy',
})
export class FilterByPipe implements PipeTransform {
  transform(properties: Property[], options: string[]): Property[] {
    if (properties) {
      if (options && options.length) {
        //filter the properties
        properties.shift();
      }
    }

    return properties;
  }
}
