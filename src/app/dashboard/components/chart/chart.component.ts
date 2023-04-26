import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from "chart.js";
import { ChartService } from '../../services/chart.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  logsPerMonth: Map<string, number> = new Map();
  topMessage: Map<string, number> = new Map();

  lineChartData!: ChartConfiguration<'line'>['data'];
  polarAreaChartData!: ChartData<'polarArea'>;
  public polarAreaLegend = false;
  public polarAreaChartType: ChartType = 'polarArea';
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;


  @Input() typeOfChart!: string;

  constructor(private chartService: ChartService){}

  ngOnInit(): void {

    this.chartService.getLogsPerMonth().subscribe(
      data => {
        this.logsPerMonth = data;
        this.lineChartData = this.getLineChartData(Array.from(this.logsPerMonth.keys()),
                                                    Array.from(this.logsPerMonth.values()));
      });

    this.chartService.getTopMessage().subscribe(
      data => {
        this.logsPerMonth = data;
        this.polarAreaChartData = this.getPolarChartData(Array.from(this.logsPerMonth.keys()),
                                                    Array.from(this.logsPerMonth.values()));
      });

  }

  getLineChartData(labels: string[], data: number[]): ChartConfiguration<'line'>['data'] {
    return {
      labels: labels,
      datasets: [
        {
          data: data,
          label: 'Number of Logs Per Month',
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: 'rgba(255,0,0,0.3)'
        }
      ]
    };
  }

  getPolarChartData(labels: string[], data: number[]): ChartData<'polarArea'> {
    return {
      labels: labels,
      datasets: [ {
        data: data,
        label:'Messages'
      } ]
    };
  }




}
