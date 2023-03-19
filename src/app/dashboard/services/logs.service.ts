import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {


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
}
