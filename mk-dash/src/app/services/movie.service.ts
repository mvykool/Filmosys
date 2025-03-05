import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl: string = environment.apiUrl;
  httpClient = inject(HttpClient);

  getPopularMovies(): Observable<any> {
    return this.httpClient
      .get<any>(this.apiUrl, {
        headers: {
          accept: 'application/json',
          Authorization: environment.apikey,
        },
      })
      .pipe(
        retry(2),
        map((movie) => movie.results.slice(0, 8)),
        catchError(this.handleError),
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'an error has occured';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error ${error.error.message}`;
    } else {
      errorMessage = `error code: ${error.status}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
