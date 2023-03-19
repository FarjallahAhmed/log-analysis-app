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
  constructor(private logsService: LogsService){
  }

  ngOnInit(): void {
    this.getAllLogs();
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
