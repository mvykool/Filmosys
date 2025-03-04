import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl: string =
    'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
  httpClient = inject(HttpClient);

  getPoke(): Observable<any> {
    return this.httpClient
      .get<any>(this.apiUrl, {
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzNhNDRiZmViZTMxNTdlNmVjNTkzZmQ2MWE5ZWU5OSIsIm5iZiI6MTY1NzQ2ODA4NS45MTI5OTk5LCJzdWIiOiI2MmNhZjRiNTkwYjg3ZTA3NTcyMjI0OGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.kFJ51taEI5l-KW3jWDmMcweq7M6OIDAWy45ma1UeT20',
        },
      })
      .pipe(
        retry(2),
        map((movie) => movie.results),
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
