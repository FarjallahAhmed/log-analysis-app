import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {




  private baseUrl = "http://localhost:9200";

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
