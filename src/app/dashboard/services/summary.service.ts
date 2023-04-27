import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  private baseUrl= "http://localhost:8080/agg/";

  constructor(private http: HttpClient) { }


  getSummaryOfLogs(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`+'summary').pipe(
      map(response => {
        const logData = {
          totalLogs: response.totalLogs,
          stackTraceLogs: response.stackTraceLogs,
          latestDate: response.latestDate,
          earliestDate: response.earliestDate,
          errorLogs: response.errorLogs,
          topLoggers: response.topLoggers,
          logLevelPercentages: new Map<string,number>(),
          errorMessagePercentages: new Map<string,number>()
        };
        Object.keys(response.errorMessagePercentages).forEach(key => {
          logData.errorMessagePercentages.set(key, Math.round(response.errorMessagePercentages[key] * 100) / 100);
        });
        Object.keys(response.logLevelPercentages).forEach(key => {
          logData.logLevelPercentages.set(key,  Math.round(response.logLevelPercentages[key] * 100) / 100);
        });

        return logData;
      })
    );
  }
}



