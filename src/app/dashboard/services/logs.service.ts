import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { API_BASE_URL } from 'src/config';


@Injectable({
  providedIn: 'root'
})
export class LogsService {


  private endpointLoadData = `${API_BASE_URL}/load-data`;
  private baseUrlStartLogstash = `${API_BASE_URL}/start-logstash`;
  private endpointLogs = `${API_BASE_URL}/api/logs/`;

  constructor(private http: HttpClient) {}

  loadDataFromFile(pathFile: string, pattern:string, logstashFile:string){
    console.log("service");
    const params = new HttpParams()
      .set('pathFile', pathFile)
      .set('pattern', pattern)
      .set('logstashFile', logstashFile);

    return this.http.post(this.endpointLoadData,null,{params});
  }

  startLogstash(pathFile: string, pattern:string, logstashFile:string) {
    this.loadDataFromFile(pathFile, pattern, logstashFile)
      .pipe(
        concatMap(() => {
          console.log("Data loaded successfully.");
          return this.http.post(this.baseUrlStartLogstash, {});
        })
      )
      .subscribe(
        () => {
          console.log("Logstash started successfully.");
        },
        (error) => {
          console.error("Error occurred:", error);
        }
      );
  }

  getExceptionLogs(index:string): Observable<Object>{
    return this.http.get(`${this.endpointLogs}`+'retrive-exception/'+index);
  }


  getsimpleLogs(index: string): Observable<Object>{
    return this.http.get(`${this.endpointLogs}`+"retrive-logs/"+index);
  }





}
