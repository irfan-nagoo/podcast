import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { SortByType } from '../../shared/constants/poadcast-constants';
import { ErrorHandlerService } from '../../shared/error/error-handler.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class PodcastListService {

  constructor(private httpClient: HttpClient, private configService: ConfigService,
    private errorHandler: ErrorHandlerService) { }

  getAllPodcasts<T>(filterMap: Map<string, string[]>, sortBy: string, pageNo: number,
    pageSize: number): Observable<T> {
    const sortByUri = this.getSortByUri(sortBy);
    const pageUri = this.getPageUri(pageNo, pageSize);
    if (filterMap.size === 0) {
      return this.httpClient.get<T>
        (`${this.configService.getApiBaseUrl()}/podcasts?${sortByUri}&${pageUri}`)
        .pipe(
          catchError(this.errorHandler.handleError)
        );
    } else {

      return this.httpClient.get<T>
        (`${this.configService.getApiBaseUrl()}/podcasts?${this.getFilterUri(filterMap)}&${sortByUri}&${pageUri}`)
        .pipe(
          catchError(this.errorHandler.handleError)
        );
    }
  }

  searchPodcasts<T>(filterMap: Map<string, string[]>, searchQuery: string, sortBy: string, pageNo: number,
    pageSize: number): Observable<T> {
    const sortByUri = this.getSortByUri(sortBy);
    const pageUri = this.getPageUri(pageNo, pageSize);
    if (filterMap.size === 0) {
      return this.httpClient.get<T>
        (`${this.configService.getApiBaseUrl()}/podcasts?q=${searchQuery}&${sortByUri}&${pageUri}`)
        .pipe(
          catchError(this.errorHandler.handleError)
        );
    } else {

      return this.httpClient.get<T>
        (`${this.configService.getApiBaseUrl()}/podcasts?q=${searchQuery}&${this.getFilterUri(filterMap)}&${sortByUri}&${pageUri}`)
        .pipe(
          catchError(this.errorHandler.handleError)
        );
    }
  }

  private getFilterUri(filterMap: Map<string, string[]>): string {
    let filterUri = '';
    filterMap.forEach((value, key) => {
      value.forEach(v => {
        // backend specific logic for duration
        if (key === "duration") {
          var valArr = v.split("-");
          if (valArr.length == 1) {
            valArr[0] = "10";
            filterUri = filterUri + "&" + key + "_gte=" + valArr[0];
          } else {
            filterUri = filterUri + "&" + key + "_gte=" + valArr[0];
            filterUri = filterUri + "&" + key + "_lte=" + valArr[1]; 
          }
        } else {
          filterUri = filterUri + "&" + key + "=" + v;
        }
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
