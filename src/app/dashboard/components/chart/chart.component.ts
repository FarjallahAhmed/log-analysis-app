import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from "chart.js";
import { ChartService } from '../../services/chart.service';
import { SummaryService } from '../../services/summary.service';
import { LogsService } from '../../services/logs.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DefaultLog } from 'src/app/core/models/defaultLog';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  logsPerMonth: Map<string, number> = new Map();
  topMessage: Map<string, number> = new Map();
  logs!: any;
  summary: Map<string, number> = new Map();



  lineChartData!: ChartConfiguration<'line'>['data'];
  barChartData!: ChartData<'bar'>
  polarAreaChartData!: ChartData<'polarArea'>;
  polarAreaChartDataSummary!: ChartData<'polarArea'>;

  pieChartData!: ChartData<'pie'>;
  public pieChartType: ChartType = 'pie';

  public polarAreaLegend = false;
  public polarAreaChartType: ChartType = 'polarArea';
  public polarAreaChartLabels!: string[];

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;
  response!: any;


  @Input() typeOfChart!: string;
  @Input() index!: string

  @Input() line!: boolean;
  @Input() pie!: boolean;
  @Input() polar!: boolean;

  logData!: any;

  constructor(private chartService: ChartService,
              private summaryService: SummaryService,
              private logsService: LogsService){}

  ngOnInit(): void {

    this.getFilteredLogLevel("ERROR");

    /*const dates = Object.keys(groupedLogs);
    const values = Object.values(groupedLogs);*/


    this.chartService.getTopMessage(this.index).subscribe(
      data =>{
        this.topMessage = data;
        this.barChartData = this.getBarChartData(Array.from(this.topMessage.keys()),
                                                    Array.from(this.topMessage.values()));
      }
    );
    this.chartService.getTopMessage(this.index).subscribe(
      data =>{
        this.topMessage = data;
        this.pieChartData = this.getPieChartData(Array.from(this.topMessage.keys()),
                                                    Array.from(this.topMessage.values()));
      }
    );
    this.chartService.getLogsPerMonth(this.index).subscribe(
      data => {
        this.logsPerMonth = data;
        this.lineChartData = this.getLineChartData(Array.from(this.logsPerMonth.keys()),
                                                    Array.from(this.logsPerMonth.values()));
      });

    this.chartService.getTopMessage(this.index).subscribe(
      data => {
        this.logsPerMonth = data;
        this.polarAreaChartLabels = Array.from(this.logsPerMonth.keys());
        this.polarAreaChartData = this.getPolarChartData(this.polarAreaChartLabels,
                                                    Array.from(this.logsPerMonth.values()));
      });
      this.summaryService.getSummaryOfLogs(this.index).subscribe(data => {
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

  getBarChartData(labels: string[], data: number[]): ChartData<'bar'> {
    return {
      labels: labels,
      datasets: [ {
        data: data
      } ]
    };
  }

  getPieChartData(labels: string[], data: number[]): ChartData<'pie'> {
    return {
      labels: labels,
      datasets: [ {
        data: data
      } ]
    };
  }

  onGenerateReport(){
    this.summaryService.getReportData(this.index).subscribe(
      data => {
        this.summaryService.generateReportPDF(data).subscribe();
      }
    )
  }

  public lineChartOptionsPolar: ChartConfiguration['options'] = {

    plugins: {
      legend: {
          position: 'right' ,
    }
    }
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['index'] && !changes['index'].firstChange) {
      this.reloadData();
    }
  }

  reloadData() {
    this.chartService.getTopMessage(this.index).subscribe(
      data =>{
        this.topMessage = data;
        this.barChartData = this.getBarChartData(Array.from(this.topMessage.keys()),
                                                    Array.from(this.topMessage.values()));
      }
    );
    this.chartService.getTopMessage(this.index).subscribe(
      data =>{
        this.topMessage = data;
        this.pieChartData = this.getPieChartData(Array.from(this.topMessage.keys()),
                                                    Array.from(this.topMessage.values()));
      }
    );
    this.chartService.getLogsPerMonth(this.index).subscribe(
      data => {
        this.logsPerMonth = data;
        this.lineChartData = this.getLineChartData(Array.from(this.logsPerMonth.keys()),
                                                    Array.from(this.logsPerMonth.values()));
      });

    this.chartService.getTopMessage(this.index).subscribe(
      data => {
        this.logsPerMonth = data;
        this.polarAreaChartLabels = Array.from(this.logsPerMonth.keys());
        this.polarAreaChartData = this.getPolarChartData(this.polarAreaChartLabels,
                                                    Array.from(this.logsPerMonth.values()));
      });
      this.summaryService.getSummaryOfLogs(this.index).subscribe(data => {
        this.response = data
        this.summary = data.errorMessagePercentages;
        this.polarAreaChartDataSummary = this.getPolarChartData(Array.from(this.summary.keys()),
                                                    Array.from(this.summary.values()));

      });
  }






  getMultiLineChartData(labels: string[], data: string[]): ChartConfiguration<'line'>['data'] {
    return {
      datasets: [
        {
          data: [ 65, 59, 80, 81, 56, 55, 40 ],
          label: labels[0],
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        },
        {
          data: [ 28, 48, 40, 19, 86, 27, 90 ],
          label: labels[1],
          backgroundColor: 'rgba(77,83,96,0.2)',
          borderColor: 'rgba(77,83,96,1)',
          pointBackgroundColor: 'rgba(77,83,96,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(77,83,96,1)',
          fill: 'origin',
        },
        {
          data: [ 180, 480, 770, 90, 1000, 270, 400 ],
          label: labels[2],
          yAxisID: 'y1',
          backgroundColor: 'rgba(255,0,0,0.3)',
          borderColor: 'red',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        }
      ],
      labels: labels
    };
  }

  getFilteredLogLevel(logLevel: string){
    this.logsService.getsimpleLogs(this.index).subscribe(
      data =>{
        this.logData = data;
        const test = this.logData.content.filter((entry: any) => entry.loglevel === logLevel);
        const logDates = test.map((log: any) => log.logDate);
        const groupedLogs = logDates.reduce((grouped: {[date: string]: number}, logDate: string) => {
          const date = logDate.split(' ')[0]; // Extract date from logDate
          grouped[date] = (grouped[date] || 0) + 1; // Increment count for the date

          return grouped;
        }, {});

      }

    )
  }

}
