import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, isEmpty, shareReplay } from 'rxjs';
import { ErrorHandlerService } from '../../shared/error/error-handler.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  private tagCache$: Observable<any> = EMPTY;

  constructor(private httpClient: HttpClient, private configService: ConfigService,
    private errorHandler: ErrorHandlerService) { }

  getTags(): Observable<any> {
    this.tagCache$.pipe(isEmpty()).subscribe(isEmpty => {
      if (isEmpty) {
        this.tagCache$ = this.httpClient.get<any>(`${this.configService.getApiBaseUrl()}/tags`)
          .pipe(
            catchError(this.errorHandler.handleError)
          )
          .pipe(
            shareReplay({ bufferSize: 1, refCount: false })
          );
      }
    });
    return this.tagCache$;
  }

  searchTags(query: string): Observable<any> {
    return this.httpClient.get<any>(`${this.configService.getApiBaseUrl()}/tags?q=${query}`)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
}
