import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { Book } from './book';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class BookService {

  // constructor() { }

  // private dummyBooksData : Book[] = [{"tags":[],"_id":"61643ac437689140c4239e5f",
  // "title":"Huckleberry Finn","author":{"name":"Twain, Mark","nationality":"American"},
  // "year_written":1865,"edition":"Penguin","price":5.76},{"tags":[],
  // "_id":"61643ac437689140c4239e61","title":"Tom Sawyer",
  // "author":{"name":"Twain, Mark","nationality":"American"},
  // "year_written":1862,"edition":"Random House","price":7.75},
  // {"tags":[],"_id":"61643ac437689140c4239e65",
  // "title":"Hamlet, Prince of Denmark",
  // "author":{"name":"Shakespeare","nationality":"English"},
  // "year_written":1603,"edition":"Signet  Classics","price":7.95},
  // {"tags":[],"_id":"61643ac437689140c4239e5e","title":"The Hours",
  // "author":{"name":"Cunnningham, Michael", "nationality": "British"},"year_written":1999,
  // "edition":"Harcourt Brace","price":12.35},{"tags":[],
  // "_id":"61643ac437689140c4239e5b","title":"War and Peace",
  // "author":{"name":"Tolstoy, Leo","nationality":"Russian"},
  // "year_written":1865,"edition":"Penguin","price":12.7}]


  // getBooks(): Observable<Book[]>{
  //   console.log('Dummy getBooks called');

  //   return of(this.dummyBooksData);


  private dataUri = 'https://localhost:8080/books'

  constructor(private http: HttpClient) { }



  getBooks(): Observable<Book[]> {

    console.log("get books called" );

    return this.http.get<Book[]>(`${this.dataUri}?limit=5`)
      .pipe(
        catchError(this.handleError)
      )
  }

  addBook(book: Book): Observable<Book> {
    console.log("add books called" );
    return this.http.post<Book>(this.dataUri, book)
      .pipe(
        catchError(this.handleError)
      )
  }

  updateBook(id: string, book: Book): Observable<Book> {
    console.log('subscribing to update' + id);
    let bookURI: string = this.dataUri + '/' + id;
    return this.http.put<Book>(bookURI, book)
      .pipe(
        catchError(this.handleError)
      )
  }

  /** DELETE: delete the book from the server */
  deleteBook(id: string): Observable<unknown> {
    const url = `${this.dataUri}/${id}`; // DELETE 
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
}



  //taken from: https://angular.io/guide/http

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }


}
