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

  data: any;
  dataline: any;

  totalByType!: number;
  totalError!: number;
  totalWarn!: number;
  totalInfo!: number;
  response: any;


  constructor(private chatService : ChartService){}

  ngOnInit(): void {
    this.getTotalLogsByType("ERROR").subscribe(totalByType => {
      this.totalError = totalByType;
      console.log(this.totalError);
      this.createChart();
    });
    this.getTotalLogsByType("INFO").subscribe(totalByType => {
      this.totalInfo = totalByType;
      console.log(this.totalInfo);
      this.createChart();
    });
    this.getTotalLogsByType("WARN").subscribe(totalByType => {
      this.totalWarn = totalByType;
      console.log(this.totalWarn);
      this.createChart();
    });
    console.log(this.totalError);
    console.log(this.totalInfo);
    console.log(this.totalWarn);
    //this.createChart();
  }

  createChart() {
    this.dataline = {
      labels: ['ERROR', 'INFO', 'WARN'],
      datasets: [
        {
          data: [this.totalError,this.totalInfo,this.totalWarn],
          backgroundColor: [
            "#C62828",
            "#00B0FF",
            "#FFD740"
          ],
        }
      ]
    }

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

}
