import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {




  private baseUrl = "http://localhost:9200/default_log_index/_search";

  constructor(private http: HttpClient) { }


  getLogs(): Observable<Object> {
    return this.http.get(`${this.baseUrl}`);
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
}
