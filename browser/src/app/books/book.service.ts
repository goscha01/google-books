import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, retry, map  } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpResponse  } from '@angular/common/http';
import { Book } from './book';


@Injectable({
  providedIn: 'root'
})


export class BookService {
  constructor(private http: HttpClient) { }

  getBookQueryParam(param:string): Observable<any>{
    console.log(`getBookQueryParam(${param})`)
    return this.http.get<Book>('http://localhost:8000/query/'+param).pipe(
      // tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data))),
      // tap((data: any) => JSON.stringify(data)),
      catchError(this.handleError));

  }

  getBookFromShelf(userId:number): Observable<any>{
    console.log(`getBookQueryParam(${userId})`)
    return this.http.get<any>('http://localhost:8000/shelf/'+userId).pipe(
      // tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data))),
      tap((data: any) => JSON.stringify(data)),
      catchError(this.handleError));

  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    let errMsg = '';
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', err.error.message);
      errMsg = err.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(`Backend returned code ${err.status}`);
      errMsg = err.error.status;
    }
    return throwError(errMsg);
  }
}
 
