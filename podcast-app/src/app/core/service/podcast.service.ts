import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Podcast } from '../model/podcast';
import { ConfigService } from './config.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PodcastService {

  constructor(private httpClient: HttpClient, private configService: ConfigService) { }

  addPodcast(formData: FormData): Observable<Podcast> {
      return this.httpClient.post<Podcast>(`${this.configService.getApiBaseUrl()}/podcasts`, formData)
      .pipe(
        catchError((error) => of(error))
      );
   }

}
