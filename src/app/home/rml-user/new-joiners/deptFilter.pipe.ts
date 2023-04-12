import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'deptFilter',
    pure: false
  })

export class deptFilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        
        if (!items) {
          return [];
        }
        if (!searchText) {
          return items;
        }
        return items.filter(item => {          
          return item.dept_name == searchText
    });
    }
  }
  