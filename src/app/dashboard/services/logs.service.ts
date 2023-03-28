import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LogsService {




  private baseUrl = "http://localhost:9200/default_log_index/_search";

  private baseUrlSpring = "http://localhost:8080/api/logs/exceptionlogs";

  constructor(private http: HttpClient) {}


  getLogs(): Observable<Object> {

    const body = {
      size: 369,
      query: {
        match_all: {},

      }
    };

    return this.http.post(`${this.baseUrl}`, body);
  }

  getLogsByType(type : string): Observable<Object> {

    const requestBody = {
      query: {
        match: {
          loglevel: type
        }
      }
    };

    return this.http.post(`${this.baseUrl}`,requestBody);
  }

  getUniqueFieldValues(fieldName : string): Observable<Object> {

    const requestBody = {
        size: 0,
        aggs: {
          unique_values: {
            terms: {
              field: fieldName
            }
          }
        }
    };

    return this.http.post(`${this.baseUrl}`,requestBody);
  }

  getExceptionLogs(): Observable<Object>{
    return this.http.get(this.baseUrlSpring);
  }





}
