import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChuckAnswer } from '../interfaces/chuck_answer';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbOperationsService {

  constructor(private http: HttpClient) { }

  getChuckNorrisAnswer() {
    return this.http.get<ChuckAnswer>('https://api.chucknorris.io/jokes/random').pipe(
      catchError(this.handleError)
    );
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return throwError(() => new Error(res || 'Server error'));
  }
  
}
