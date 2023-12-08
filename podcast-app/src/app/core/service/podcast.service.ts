import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../../shared/error/error-handler.service';
import { Podcast } from '../model/podcast';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class PodcastService {

  constructor(private httpClient: HttpClient, private configService: ConfigService,
    private errorHandler: ErrorHandlerService) { }

  addPodcast<T>(formData: FormData): Observable<T> {
    return this.httpClient.post<T>(`${this.configService.getApiBaseUrl()}/podcasts`, formData)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

}
