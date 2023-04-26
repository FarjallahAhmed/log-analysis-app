import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LogsService } from '../../services/logs.service';

@Component({
  selector: 'app-logs-table',
  templateUrl: './logs-table.component.html',
  styleUrls: ['./logs-table.component.scss']
})
export class LogsTableComponent implements OnInit{

  response!: any;
  error!: any[];
  responseErro!: any;
  totalLog!: number;
  logs!: any;
  totalByType!: number;
  totalError!: number;
  totalWarn!: number;
  totalInfo!: number;
  logsByTypeTotlal!: number[];
  logsLevel!: string[];
  typeOfChart!: string;

  constructor(private logsService: LogsService){
    this.typeOfChart = 'line';
  }

  ngOnInit(): void {
    this.getAllLogs();
    this.logsService.getUniqueFieldValues("loglevel").subscribe(data => {
      this.response = data;
      const len = this.response.aggregations.unique_values.buckets.length;
      this.logsByTypeTotlal = [];
      this.logsLevel = [];
      for(let i = 0; i < len; i++) {
        const bucket = this.response.aggregations.unique_values.buckets[i];
        this.logsByTypeTotlal.push(bucket["doc_count"]);
        this.logsLevel.push(bucket["key"]);
        console.log(this.logsByTypeTotlal );
        console.log(this.logsLevel);
      }

    });
    this.getTotalLogsByType("ERROR").subscribe(totalByType => {
      this.totalError = totalByType
    });
    this.getTotalLogsByType("INFO").subscribe(totalByType => {
      this.totalInfo = totalByType
    });
    this.getTotalLogsByType("WARN").subscribe(totalByType => {
      this.totalWarn = totalByType
    });
  }
  getAllLogs(){
    this.logsService.getLogs().subscribe(data => {
      this.response = data;
      this.totalLog = this.response.hits.total.value;
      this.logs = this.response.hits.hits;
      console.log(this.logs);
    });
  }

  getTotalLogsByType(type: string): Observable<number>{
    return this.logsService.getLogsByType(type).pipe(
      map(data => {
        this.response = data;
        const totalByType = this.response.hits.total.value;
        return totalByType;
      })
    );
  }


}
