import { Injectable } from '@angular/core';

/**
 * The QueryString service.
 * Used for sanitizing (e.g. remove line breaks)
 */
@Injectable()
export class QueryStringService{

  /**
   * Will remove line breaks from strings
   * @param query
   */
  public removeLineBreaks(query: string){
    if(!query){
      return;
    }
    var lineBreakRegex = new RegExp(/\r?\n|\r/g);
    return query.replace(lineBreakRegex, '');
  }

  /**
   * Will remove line breaks from the filters
   * @param filters
   */
  public sanitizeFilters(filters: any){
    filters.map(filter => {
      filter.options.map(option => option.query = this.removeLineBreaks(option.query));
    });
    return filters;
  }
}
