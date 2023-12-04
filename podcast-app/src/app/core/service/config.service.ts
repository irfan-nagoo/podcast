import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../model/config';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configUrl: string;
  private config: Config;

  constructor(private httpClient: HttpClient) {
    this.config = { apiBaseUrl: "" };
    this.configUrl = './assets/config/config.json'
  }

  async loadConfig() {
    return await lastValueFrom(this.httpClient.get<Config>(this.configUrl)).then(config =>
      this.config = config
    );
  }

  getApiBaseUrl() {
    if (!this.config.apiBaseUrl) {
      this.loadConfig();
    }
    return this.config.apiBaseUrl;
  }

}
