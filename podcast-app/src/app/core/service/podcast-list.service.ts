import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Podcast } from '../model/podcast';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class PodcastListService {

  constructor(private httpClient: HttpClient, private configService: ConfigService) { }

  getAllPodcasts(): Observable<Podcast[]> {
    return this.httpClient.get<Podcast[]>(`${this.configService.getApiBaseUrl()}/podcasts`);
  }

}
