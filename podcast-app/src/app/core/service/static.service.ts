import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ErrorHandlerService } from '../../shared/error/error-handler.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class StaticService {

  constructor(private httpClient: HttpClient, private configService: ConfigService,
    private errorHandler: ErrorHandlerService) { }

  getCategories(): Observable<any> {
    return this.httpClient.get<any>(`${this.configService.getApiBaseUrl()}/static/categories`)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  getTags(): Observable<any> {
    return this.httpClient.get<any>(`${this.configService.getApiBaseUrl()}/static/tags`)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  getDurations(): Observable<any> {
    return this.httpClient.get<any>(`${this.configService.getApiBaseUrl()}/static/durations`)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  getSortFields(): Observable<any> {
    return this.httpClient.get<any>(`${this.configService.getApiBaseUrl()}/static/sort-fields`)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
}
