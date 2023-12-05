import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class StaticService {

  constructor(private httpClient: HttpClient, private configService: ConfigService) { }

  getCategories(): Observable<any> {
    return this.httpClient.get<any>(`${this.configService.getApiBaseUrl()}/static/categories`);
  }

  getTags(): Observable<any> {
    return this.httpClient.get<any>(`${this.configService.getApiBaseUrl()}/static/tags`);
  }

  getDurations(): Observable<any> {
    return this.httpClient.get<any>(`${this.configService.getApiBaseUrl()}/static/durations`);
  }

  getSortFields(): Observable<any> {
    return this.httpClient.get<any>(`${this.configService.getApiBaseUrl()}/static/sort-fields`);
  }
}
