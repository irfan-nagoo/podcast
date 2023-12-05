import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SortByType } from '../../shared/constants/poadcast-constants';
import { Podcast } from '../model/podcast';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class PodcastListService {

  constructor(private httpClient: HttpClient, private configService: ConfigService) { }

  getAllPodcasts(filterMap: Map<string, string[]>, sortBy: string, pageNo: number, pageSize: number): Observable<Podcast[]> {
    const sortByUri = this.getSortByUri(sortBy);
    const pageUri = this.getPageUri(pageNo, pageSize);
    if (filterMap.size === 0) {
      return this.httpClient.get<Podcast[]>
        (`${this.configService.getApiBaseUrl()}/podcasts?${sortByUri}&${pageUri}`);
    } else {
      
      return this.httpClient.get<Podcast[]>
        (`${this.configService.getApiBaseUrl()}/podcasts?${this.getFilterUri(filterMap)}&${sortByUri}&${pageUri}`);
    }
  }

  searchPodcasts(filterMap: Map<string, string[]>, searchQuery: string, sortBy: string, pageNo: number, pageSize: number): Observable<Podcast[]> {
    const sortByUri = this.getSortByUri(sortBy);
    const pageUri = this.getPageUri(pageNo, pageSize);
    if (filterMap.size === 0) {
      return this.httpClient.get<Podcast[]>
        (`${this.configService.getApiBaseUrl()}/podcasts?q=${searchQuery}&${sortByUri}&${pageUri}`);
    } else {
      
      return this.httpClient.get<Podcast[]>
        (`${this.configService.getApiBaseUrl()}/podcasts?q=${searchQuery}&${this.getFilterUri(filterMap)}&${sortByUri}&${pageUri}`);
    }
  }

  private getFilterUri(filterMap: Map<string, string[]>): string {
    let filterUri = '';
    filterMap.forEach((value, key) => {
      value.forEach(v => {
        filterUri = filterUri + "&" + key + "=" + v;
      })
    });
    return filterUri;
  }


  private getSortByUri(sortBy: string): string {
    switch (sortBy) {
      case SortByType.DEFAULT:
      case SortByType.NEWEST:
        return `_sort=modifiedDate&_order=desc`;
      case SortByType.TITLE:
        return `_sort=title&_order=asc`;
      case SortByType.MOST_RATED:
        return `_sort=ratings&_order=desc`;
      default:
        return `_sort=modifiedDate&_order=desc`;
    }
  }

  private getPageUri(pageNo: number, pageSize: number): string {
    return `_start=${pageNo * pageSize}&_limit=${pageSize}`;
  }

}
