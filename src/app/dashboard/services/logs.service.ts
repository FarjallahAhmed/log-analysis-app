import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { API_BASE_URL } from 'src/config';


@Injectable({
  providedIn: 'root'
})
export class LogsService {


  private endpointLoadDataFromFile = `${API_BASE_URL}/load-data-from-file`;
  private endpointLoadDataFromDirectory = `${API_BASE_URL}/load-data-from-directory`;
  private endpointLogs = `${API_BASE_URL}/api/logs/`;

  constructor(private http: HttpClient) {}

  loadDataFromFile(pathFile: string, pattern:string, logstashFile:string){

    const params = new HttpParams()
      .set('pathFile', pathFile)
      .set('pattern', pattern)
      .set('logstashFile', logstashFile);

    return this.http.post(this.endpointLoadDataFromFile,null,{params});
  }

  loadDataFromDirectory(directory: string,  logstashFile:string){

    const params = new HttpParams()
      .set('directory', directory)
      .set('logstashFile', logstashFile);

    return this.http.post(this.endpointLoadDataFromDirectory,null,{params});
  }

  getExceptionLogs(index:string): Observable<Object>{
    return this.http.get(`${this.endpointLogs}`+'retrive-exception/'+index);
  }


  getsimpleLogs(index: string): Observable<Object>{
    return this.http.get(`${this.endpointLogs}`+"retrive-logs/"+index);
  }





}
