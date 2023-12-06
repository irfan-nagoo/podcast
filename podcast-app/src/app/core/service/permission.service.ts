import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private httpClient: HttpClient, private configService: ConfigService) { }

  getUserLevelPermissions(): Observable<any> {
    return this.httpClient.get<any>(`${this.configService.getApiBaseUrl()}/permission/user-level`);
  }

  getRowLevelPermissions(): Observable<any> {
    return this.httpClient.get<any>(`${this.configService.getApiBaseUrl()}/permission/row-level`);
  }
}
