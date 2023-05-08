import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartService } from '../../services/chart.service';
import { LogsService } from '../../services/logs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{



  //data: any;
  dataline: any;
  ErrorPie: any;
  options: any;
  listLogs!: any;
  pageClient!: any;
  totalByType!: number;
  totalError!: number;
  totalWarn!: number;
  totalInfo!: number;
  response: any;
  ErrorMessage!: any[];
  Exceptions!: any[];
  ExeceptionLength!: number;
  ErrorlogsMessage!: any;
  StackTraceLog!: any;
  visible!: boolean;

  total!: number;
  item = 5 ;
  selectedPage = 0;
  pageContent!: any;
  p: number = 1;

  totalException!: number;
  itemException = 5 ;
  selectedPageException = 0;
  pageContentException!: any;
  pException: number = 1;
  index!: string;


  constructor(private chatService : ChartService,private logService: LogsService){}

  ngOnInit(): void {
    this.pageContent = [];
    this.index = "default_log_index";
    this.reloadData();
    this.getExceptions().subscribe(data=>{

      this.response = data;
      this.ExeceptionLength = this.response.length;
      const errorMessage: string[] = [];
      const stackTrace: string[] = [];
      this.response.forEach((obj: any) => {
        errorMessage.push(obj.errorMessage);
        stackTrace.push(obj.stackTrace);
      });
      //console.table(errorMessage);
      //console.table(stackTrace);
      this.ErrorlogsMessage = errorMessage;
      this.StackTraceLog = stackTrace;
    })
    this.getTotalLogsByType("ERROR").subscribe(totalByType => {
      this.totalError = totalByType;
      this.createChart();
    });
    this.getTotalLogsByType("INFO").subscribe(totalByType => {
      this.totalInfo = totalByType;
      this.createChart();
    });
    this.getTotalLogsByType("WARN").subscribe(totalByType => {
      this.totalWarn = totalByType;
      this.createChart();
    });

    this.chatService.getUniqueFieldValues("ErrorMessage.keyword").subscribe(data => {
        this.response = data,
        this.ErrorMessage = this.response.aggregations.unique_values.buckets;
        const keys: string[] = [];
        const values: number[] = [];
        this.ErrorMessage.forEach((obj) => {
              keys.push(obj.key);
              values.push(obj.doc_count);
      });
      //console.table(keys);
      //console.table(values);

      this.createChartErrorMessage(keys,values);
    });
  }
  showDialog() {
    this.visible = true;
  }
  createChart() {
    this.dataline = {
      labels: ['ERROR', 'INFO', 'WARN'],
      datasets: [
        {
          data: [this.totalError,this.totalInfo,this.totalWarn],
          backgroundColor: [
            "#FF5252",
            "#80D8FF",
            "#FFFF8D"
          ],
        }
      ]
    }
  }

  createChartErrorMessage(labels: string[], data: number[]) {
    const textColor = "#212121";
    this.ErrorPie = {
    labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: ['#B388FF',
                            '#EA80FC',
                            '#FF80AB',
                            '#8C9EFF',
                            '#82B1FF',
                            '#80D8FF',
                            '#84FFFF',
                            '#B9F6CA',
                            '#FFD180',
                            '#FF8A80']

        }
      ]
    };
    this.options = {
      plugins: {
          legend: {
              labels: {
                  usePointStyle: true,
                  color: textColor,
              },
              display: false
          }
      }
  };
  }

  getTotalLogsByType(type: string): Observable<number>{
    return this.chatService.getLogsByType(type).pipe(
      map(data => {
        this.response = data;
        const totalByType = this.response.hits.total.value;

        return totalByType;
      })
    );
  }

  getException(type:string):void{
    this.chatService.getUniqueFieldValues(type).pipe(
      map(data => {
        this.response = data;
        const totalByType = this.response.hits.total.value;
      }),
    );
  }


  getExceptions(): Observable<Object>{
    return this.logService.getExceptionLogs(this.index).pipe(
      map(data => {
        this.response = data;
        const exception = this.response.content;
        this.totalException = this.response.totalElements;
        this.pageContentException = this.response.content;
        return exception;
      })
    );
  }


  getSimpleLogs(){
    this.logService.getsimpleLogs(this.index).subscribe(data =>{
      this.pageClient = data;
      this.total = this.pageClient.totalElements;
      this.pageContent = this.pageClient.content;
    })
  }

  /** Pagination: Change page number */
  getItems(itemsNumber: number) {
    this.item = itemsNumber;
    this.onSelect(1);
  }

  onSelect(pageNumber: number) {
    this.selectedPage = pageNumber - 1;
    this.getSimpleLogs();
  }
  reloadData() {
    this.pageContent = this.getSimpleLogs();
  }
selectValue(value: string) {
    this.index = value;
    console.log(this.index);
  }
}
