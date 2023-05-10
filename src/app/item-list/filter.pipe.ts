import { Pipe, PipeTransform } from '@angular/core';
import { Item } from './item.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: Item[], searchTerm: string): Item[] {
    if (searchTerm == '') {
      return items;
    }

    searchTerm = searchTerm.toLowerCase();
    console.log(items)
    console.log(searchTerm)
    console.log(items.filter((item) => {
      item.name === searchTerm
    }))

    return items.filter((item) => {
      return item.name.toLowerCase().includes(searchTerm);
    });
  }
}
