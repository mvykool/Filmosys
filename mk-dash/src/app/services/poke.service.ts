import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151';

  constructor(private httpClient: HttpClient) {}

  //get 151 pokemons
  getPoke(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl).pipe(
      retry(2),
      map((pokemon) => ({ ...pokemon })),
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
