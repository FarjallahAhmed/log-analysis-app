import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private apiUrl = 'http://localhost:8080/api/logs/filter/';


  constructor(private http: HttpClient) { }


  filterLogsWithDateRange(startDate: Date, endDate: Date): Observable<any> {
    const params = {
      'start-date': startDate.toISOString().slice(0, 10),
      'end-date': endDate.toISOString().slice(0, 10)
    };

    return this.http.get<any>(`${this.apiUrl}` + 'logs-by-date-range', { params }).pipe(
      //map(response => response.logs)
      map(response => {
        return response.logs.map((log: {
          log_date: string;
          loglevel: any;
          logger: any;
          threadname: any;
          logmessage: any;
          uuid: any;
          package: any;
        }) => {
          const logDate = log.log_date;
          const logLevel = log.loglevel;
          const logger = log.logger;
          const threadName = log.threadname;
          const logmessage = log.logmessage;
          const uuid = log.uuid;
          const packagee = log.package;
          return {
            packagee,
            logger,
            logmessage: logmessage,
            uuid,
            loglevel: logLevel,
            threadname: threadName,
            log_date: logDate
          };
        });
      })
    );
  }
}
