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

  qureyData!:any[]
  query!:string;

  constructor(private http: HttpClient) { }

  getBookQueryParam(param:string): Observable<any>{
    console.log(`getBookQueryParam(${param})`)
    return this.http.get<any>('http://localhost:8000/query/'+param).pipe(
      // tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data))),
      // tap((data: any) => JSON.stringify(data)),
      // tap((data: any) => this.qureyData = data),
      catchError(this.handleError));

  }

  getBooksFromDB(): Observable<any>{
     return this.http.get<any>('http://localhost:8000/db/').pipe(
      // tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data))),
      tap((data: any) => JSON.stringify(data)),
      catchError(this.handleError));

  }


  PutBookOnShelf(book:any): Observable<any>{
    console.log(`PutBookOnShelf(${book})`)
    return this.http.get<any>('http://localhost:8000/shelf/'+book).pipe(
      tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data))),
      // tap((data: any) => JSON.stringify(data)),
      catchError(this.handleError));

  }

  deleteBookOnShelf(): Observable<any>{
    console.log(`deleteBookOnShelf()`)
    return this.http.get<any>('http://localhost:8000/delete/').pipe(
      // tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data))),
      tap((data: any) => JSON.stringify(data)),
      catchError(this.handleError));
  }
  deleteAllOnShelf(): Observable<any>{
    console.log(`deleteBookOnShelf()`)
    return this.http.get<any>('http://localhost:8000/deleteall/').pipe(
      // tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data))),
      tap((data: any) => JSON.stringify(data)),
      catchError(this.handleError));
  }

  getDataFromBoth() : Observable<any>{
    console.log(`deleteBookOnShelf()`)
    return this.http.get<any>('http://localhost:8000/both/').pipe(
      tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data))),
      // tap((data: any) => JSON.stringify(data)),
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
 
