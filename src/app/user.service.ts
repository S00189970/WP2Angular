import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {  
  private apiURI: string = 'http://localhost:3000';
  private userSubject: BehaviorSubject<User|null>;
  public user: Observable<User|null>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User|null>
    (JSON.parse(localStorage.getItem('currentUser') || '{}')) ;
    this.user = this.userSubject.asObservable();

   }


  createUser(user: User): Observable<User> {

    const uri: string = this.apiURI + '/users';

    return this.http.post<User>(uri, user).
      pipe(
        catchError(this.handleError)
      );
  }

  getUsers(): Observable<User[]> {

    console.log("get Users called");

    return this.http.get<User[]>(`${this.apiURI}/users`)
      .pipe(
        catchError(this.handleError)
      )
  }

  public login(email: string, password: string): Observable<any> {

    return this.http.post<any>(`${this.apiURI}/auth`, { email: email, password: password }).
    pipe(map(user => {
     localStorage.setItem('currentUser', JSON.stringify(user))
     this.userSubject.next(user);
    // later we will start a timer based on the JWT expiry and
    // use a refresh token to get a new JWT in the background.
    //this.startAuthenticateTimer();
    return user;}
    ))
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
}



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
