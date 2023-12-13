import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, isEmpty, shareReplay } from 'rxjs';
import { ErrorHandlerService } from '../../shared/error/error-handler.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class StaticService {

  private categoryCache$: Observable<any> = EMPTY;
  private durationCache$: Observable<any> = EMPTY;
  private sortFieldCache$: Observable<any> = EMPTY;

  constructor(private httpClient: HttpClient, private configService: ConfigService,
    private errorHandler: ErrorHandlerService) { }

  getCategories(): Observable<any> {
    this.categoryCache$.pipe(isEmpty()).subscribe(isEmpty => {
      if (isEmpty) {
        this.categoryCache$ = this.httpClient.get<any>(`${this.configService.getApiBaseUrl()}/static/categories`)
          .pipe(
            catchError(this.errorHandler.handleError)
          )
          .pipe(
            shareReplay({ bufferSize: 1, refCount: false })
          );
      }
    });
    return this.categoryCache$;
  }

  getDurations(): Observable<any> {
    this.durationCache$.pipe(isEmpty()).subscribe(isEmpty => {
      if (isEmpty) {
        this.durationCache$ = this.httpClient.get<any>(`${this.configService.getApiBaseUrl()}/static/durations`)
          .pipe(
            catchError(this.errorHandler.handleError)
          )
          .pipe(
            shareReplay({ bufferSize: 1, refCount: false })
          );
      }
    });
    return this.durationCache$;
  }

  getSortFields(): Observable<any> {
    this.sortFieldCache$.pipe(isEmpty()).subscribe(isEmpty => {
      if (isEmpty) {
        this.sortFieldCache$ = this.httpClient.get<any>(`${this.configService.getApiBaseUrl()}/static/sort-fields`)
          .pipe(
            catchError(this.errorHandler.handleError)
          )
          .pipe(
            shareReplay({ bufferSize: 1, refCount: false })
          )
      }
    });
    return this.sortFieldCache$;
  }
}
