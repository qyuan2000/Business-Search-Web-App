import { Host, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { HOST } from './hostname';
import { SearchUtility } from './search-utility';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private searchYelpPre = HOST + 'api/searchyelp';
  private detailYelpPre = HOST + 'api/detailyelp';
  private reviewYelpPre = HOST + 'api/reviewyelp';
  private autoYelpPre = HOST + 'api/autowhynotwork';

  constructor(private http: HttpClient) { }

  fetchYelputil(yelpQuery: string) {
    console.log("called fetchYelputil()");
    const searchutilUrl = `${this.searchYelpPre}/${yelpQuery}`;
    return this.http.get(searchutilUrl).pipe(
      catchError(this.handleError('fetchYelputil', [])) // then handle the error
    );
  }

  fetchYelpdetail(detailID: string){
    console.log("called detail query");
    const detailUrl = `${this.detailYelpPre}/${detailID}`;
    return this.http.get(detailUrl).pipe(
      catchError(this.handleError('fetchYelputil', [])) // then handle the error
    );
  }

  fetchYelpreview(reviewID: string){
    console.log("called review query");
    const detailUrl = `${this.reviewYelpPre}/${reviewID}`;
    return this.http.get(detailUrl).pipe(
      catchError(this.handleError('fetchYelputil', [])) // then handle the error
    );
  }

  fetchYelpauto(keyword: string){
    console.log("called auto query", keyword);
    const detailUrl = `${this.autoYelpPre}/${keyword}`;
    return this.http.get(detailUrl).pipe(
      catchError(this.handleError('fetchYelputil', [])) // then handle the error
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
