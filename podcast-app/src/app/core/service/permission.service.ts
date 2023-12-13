import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, isEmpty, shareReplay } from 'rxjs';
import { ErrorHandlerService } from '../../shared/error/error-handler.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private userPermissionCache$: Observable<any> = EMPTY;
  private rowPermissionCache$: Observable<any> = EMPTY;

  constructor(private httpClient: HttpClient, private configService: ConfigService,
    private errorHandler: ErrorHandlerService) { }

  getUserLevelPermissions(): Observable<any> {
    this.userPermissionCache$.pipe(isEmpty()).subscribe(isEmpty => {
      if (isEmpty) {
        this.userPermissionCache$ = this.httpClient.get<any>(`${this.configService.getApiBaseUrl()}/permission/user-level`)
          .pipe(
            catchError(this.errorHandler.handleError)
          )
          .pipe(
            shareReplay({ bufferSize: 1, refCount: false })
          )
      }
    });
    return this.userPermissionCache$;
  }

  getRowLevelPermissions(): Observable<any> {
    this.rowPermissionCache$.pipe(isEmpty()).subscribe(isEmpty => {
      if (isEmpty) {
        this.rowPermissionCache$ = this.httpClient.get<any>(`${this.configService.getApiBaseUrl()}/permission/row-level`)
          .pipe(
            catchError(this.errorHandler.handleError)
          )
          .pipe(
            shareReplay({ bufferSize: 1, refCount: false })
          )
      }
    });
    return this.rowPermissionCache$;
  }
}
