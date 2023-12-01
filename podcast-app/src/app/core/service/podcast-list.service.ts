import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Podcast } from '../model/podcast';

@Injectable({
  providedIn: 'root'
})
export class PodcastListService {

  constructor(private httpClient: HttpClient) {}

  getAllPodcasts(){
    return this.httpClient.get<Podcast[]>("http://localhost:3004/poadcasts");
  }

}
