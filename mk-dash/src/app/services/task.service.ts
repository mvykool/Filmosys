import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Task } from '../models/task.model';
import { updateTask } from '../store/tasks/tasks.actions';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      // retry failed requests up to 2 times
      retry(2),
      //mapping response to ensure proper date objhect
      map((tasks) =>
        tasks.map((task) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updated: new Date(task.updated),
        })),
      ),
      catchError(this.handleError),
    );
  }

  // get a single task id
  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`).pipe(
      map((task) => ({
        ...task,
        created: new Date(task.createdAt),
        updated: new Date(task.updated),
      })),

      catchError(this.handleError),
    );
  }

  //create a new task
  createTask(
    task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>,
  ): Observable<Task> {
    //preparing dates on client side
    const now = new Date();

    return this.http
      .post<Task>(this.apiUrl, {
        ...task,
        createdAt: now,
        updatedAt: now,
      })
      .pipe(
        map((newTask) => ({
          ...newTask,
          createdAt: new Date(newTask.createdAt),
          updated: new Date(newTask.updated),
        })),
        catchError(this.handleError),
      );
  }

  updateTask(id: string, changes: Partial<Task>): Observable<Task> {
    return this.http
      .post<Task>(this.apiUrl, {
        ...changes,
        updatedAt: new Date(),
      })
      .pipe(
        map((updatedTask) => ({
          ...updatedTask,
          createdAt: new Date(updatedTask.createdAt),
          updated: new Date(updatedTask.updated),
        })),
        catchError(this.handleError),
      );
  }

  //delete
  deleteTask(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
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
