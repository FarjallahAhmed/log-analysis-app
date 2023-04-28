import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from "chart.js";
import { ChartService } from '../../services/chart.service';
import { SummaryService } from '../../services/summary.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  logsPerMonth: Map<string, number> = new Map();
  topMessage: Map<string, number> = new Map();

  summary: Map<string, number> = new Map();
  lineChartData!: ChartConfiguration<'line'>['data'];
  polarAreaChartData!: ChartData<'polarArea'>;

  polarAreaChartDataSummary!: ChartData<'polarArea'>;
  public polarAreaLegend = false;
  public polarAreaChartType: ChartType = 'polarArea';
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;
  response!: any;


  @Input() typeOfChart!: string;

  constructor(private chartService: ChartService,private summaryService: SummaryService){}

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

      this.summaryService.getSummaryOfLogs().subscribe(data => {
        this.response = data
        this.summary = data.errorMessagePercentages;
        this.polarAreaChartDataSummary = this.getPolarChartData(Array.from(this.summary.keys()),
                                                    Array.from(this.summary.values()));

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
