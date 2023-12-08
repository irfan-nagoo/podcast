import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ErrorHandlerService } from '../../shared/error/error-handler.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private httpClient: HttpClient, private configService: ConfigService,
    private errorHandler: ErrorHandlerService) { }

  getTags(): Observable<any> {
    return this.httpClient.get<any>(`${this.configService.getApiBaseUrl()}/tags`)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  searchTags(query: string): Observable<any> {
    return this.httpClient.get<any>(`${this.configService.getApiBaseUrl()}/tags?q=${query}`)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
}
