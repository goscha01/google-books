import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(value: any[], args?: any): any[] {
    if (args === 'searchword') {
      return value.sort((a: any, b: any) => {
        if (a.searchword < b.searchword) {
          return -1;
        } else if (a.searchword > b.searchword) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (args === 'id') {
      return value.sort((a: any, b: any) => {
        if (a.id < b.id) {
          return -1;
        } else if (a.id > b.id) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (args === 'date') {
      return value.sort((a: any, b: any) => {
        if (a.tstamp < b.tstamp) {
          return -1;
        } else if (a.tstamp > b.tstamp) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (args === 'favorite') {
      return value.sort((a: any, b: any) => {
        if (a.favorite) {
          return -1;
        } else if (b.favorite) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (args === 'bookId') {
      return value.sort((a: any, b: any) => {
        if (a.bookid < b.bookid) {
          return -1;
        } else if (a.bookid > b.bookid) {
          return 1;
        } else {
          return 0;
        }
      });
    }  else {
      return value;
    }
  }
}
