import { formatDate } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DefaultException } from 'src/app/core/models/defaultException';
import { DefaultLog } from 'src/app/core/models/defaultLog';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private apiUrl = 'http://localhost:8080/api/logs/filter/';


  constructor(private http: HttpClient) { }


  filterLogsWithDateRange(startDate: Date, endDate: Date,index: string): Observable<any> {
    const url = `${this.apiUrl}logs-by-date-range/${index}`;
    const params = {
      'start-date': startDate.toISOString().slice(0, 10),
      'end-date': endDate.toISOString().slice(0, 10)
    };

    return this.http.get<any>(url, { params }).pipe(
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

  filterErrorException(errorMessage: string, index: string): Observable<DefaultException[]> {
    const url = `${this.apiUrl}errormessage/${index}?errorMessage=${errorMessage}`;
    return this.http.get<DefaultException[]>(url);
  }

  filterLogLevel(loglevel: string, index: string): Observable<DefaultLog[]> {
    const url = `${this.apiUrl}loglevel/${index}?loglevel=${loglevel}`;
    return this.http.get<DefaultLog[]>(url);
  }

  filterLogByMessage(logmessage: string, index: string): Observable<DefaultLog[]> {
    const url = `${this.apiUrl}logmessage/${index}?logmessage=${logmessage}`;
    return this.http.get<DefaultLog[]>(url);
  }

  getLogsByDateRange(startDate: Date, endDate: Date, index: string): Observable<any> {
    const url = `${this.apiUrl}logs-by-date-range/${index}`;
    const params = new HttpParams()
      .set('start-date', startDate.toISOString().split('T')[0])
      .set('end-date', endDate.toISOString().split('T')[0]);

    return this.http.get<any>(url, { params: params }).pipe(
      map(response => {
        console.log(response)
        return response.logs.map((log: {
          log_date: string;
          loglevel: any;
          logger: any;
          threadname: any;
          logmessage: any;
          uuid: any;
          package: any;
          day:any;
          month:any;
          year:any;
        }) => {
          const logDate = log.log_date;
          const logLevel = log.loglevel;
          const logger = log.logger;
          const threadName = log.threadname;
          const logmessage = log.logmessage;
          const uuid = log.uuid;
          const packagee = log.package;
          const year = log.year;
          const month = log.month;
          const day = log.day;
          return {
            packagee,
            logger,
            logMessage: logmessage,
            uuid,
            loglevel: logLevel,
            threadName: threadName,
            log_date: logDate,
            day: day,
            year: year,
            month: month
          };
        });
      })
    );
  }





}
