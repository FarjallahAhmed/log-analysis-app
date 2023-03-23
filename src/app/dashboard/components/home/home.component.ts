import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartService } from '../../services/chart.service';

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

  totalByType!: number;
  totalError!: number;
  totalWarn!: number;
  totalInfo!: number;
  response: any;
  ErrorMessage!: any[];



  constructor(private chatService : ChartService){}

  ngOnInit(): void {


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
      console.table(keys);
      console.table(values);

      this.createChartErrorMessage(keys,values);
    });
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

}
