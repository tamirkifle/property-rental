import { Pipe, PipeTransform } from '@angular/core';
import { Property } from './property';

@Pipe({
  name: 'propertyFilter',
})
export class PropertyFilterPipe implements PipeTransform {
  transform(properties: Property[], arg: string): Property[] {
    const searchFields = ['propertyTitle', 'location'];
    if (!arg || !properties) {
      return properties;
    }
    else if('bedroom'.includes(arg) || 'bathroom'.includes(arg)){
      return properties;
    }
    else{
      arg = arg.toLowerCase();
      return properties.filter(property => {
        for (let field of searchFields){
          if (property[field].toLowerCase().includes(arg)){
            return true;
          }
        }
      });
    }
  }
}
