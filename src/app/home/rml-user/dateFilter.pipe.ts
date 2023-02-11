import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateRangeFilter'
})
export class DateRangeFilterPipe implements PipeTransform {

  transform(items: any[], fromDate: Date, toDate: Date, colname: any): any[] {
    console.log("rrr", fromDate, toDate)

    fromDate = new Date(fromDate)
    toDate = new Date(toDate)

    if (!items) {
      return [];
    }

    if (!fromDate || !toDate) {
      return items;
    }

    return items.filter(item => 
    {
      let itemDate = new Date(item[colname]);
      return itemDate >= fromDate && itemDate <= toDate;
    });
  }
}