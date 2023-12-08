import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { API_INVOCATION_ERROR, ResponseStatusType } from '../constants/poadcast-constants';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  handleError(error : HttpErrorResponse): Observable<any>{
    console.error("Error occured:", error);
    return of({ status: ResponseStatusType.ERROR,
                              text: API_INVOCATION_ERROR});
  }




}
