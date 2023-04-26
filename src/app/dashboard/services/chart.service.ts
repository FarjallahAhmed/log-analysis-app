import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChartService {


  private baseUrlSpring = "http://localhost:8080/agg/";


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


  getLogsPerMonth(): Observable<Map<string, number>> {
    return this.http.get<{ [key: string]: number }>(this.baseUrlSpring+'logs-per-month').pipe(
      map(response => {
        const logsPerMonth = new Map<string, number>();
        Object.keys(response).forEach(key => {
          logsPerMonth.set(key, response[key]);
        });
        return logsPerMonth;
      })
    );
  }

  getTopMessage(): Observable<Map<string, number>>{
    return this.http.get<{ [key: string]: number }>(this.baseUrlSpring+'logs-top-message').pipe(
      map(response => {
        const topMessage = new Map<string, number>();
        Object.keys(response).forEach(key => {
          topMessage.set(key, response[key]);
        });
        return topMessage;
      })
    );
  }
}
