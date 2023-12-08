import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ErrorHandlerService } from '../../shared/error/error-handler.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private httpClient: HttpClient, private configService: ConfigService,
    private errorHandler: ErrorHandlerService) { }

  getUserLevelPermissions(): Observable<any> {
    return this.httpClient.get<any>(`${this.configService.getApiBaseUrl()}/permission/user-level`)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  getRowLevelPermissions(): Observable<any> {
    return this.httpClient.get<any>(`${this.configService.getApiBaseUrl()}/permission/row-level`)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
}
