import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { environment  as  env}  from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class BookService {
  qureyData!: any[];
  query!: string;
  // url:string = 'http://ec2-54-147-18-175.compute-1.amazonaws.com/' //aws node server
  url: string = 'http://localhost:3000/api/' //local url
  // url: string = 'http://node-server-google-books.us-east-1.elasticbeanstalk.com/' //ELB pipeline server url


  constructor(private http: HttpClient) {}

  //Get query data from DB or API
  getBookQueryParam(param: string): Observable<any> {
    return this.http.get<any>(this.url + 'query/' + param).pipe(
      // tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  //Get query data from DB
  getBooksFromDB(): Observable<any> {
    console.log(this.url +'db/')
    return this.http.get<any>(this.url +'db/').pipe(
      // tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  //Add book to favorite (set favorite flag to true)
  setFlag(data: any): Observable<any> {
    console.log(data)
    return this.http.get<any>(this.url +'shelf/' + data.id +"/" + data.fav).pipe(
      // tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  //Get all book which have favorite = true
  GetBooksFromShelf(): Observable<any> {
    return this.http.get<any>(this.url + 'shelf/').pipe(
      // tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  //Delete one book from DB
  deleteBookFromDB(bookId:string): Observable<any> {
    return this.http.get<any>(this.url +'delete/' + bookId).pipe(
      tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  //Delete all books from DB
  deleteAllBooksFromDB(): Observable<any> {
    return this.http.get<any>(this.url +'deleteall/').pipe(
      // tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data))),
      tap((data: any) => JSON.stringify(data)),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    let errMsg = '';
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', err.error.message);
      errMsg = err.error.message;
    } else if (err.error.status === 204) {
      console.log(`Backend returned code ${err.status}`);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(`Backend returned code ${err.status}`);
      errMsg = err.error.status;
    }
    return throwError(errMsg);
  }
}
