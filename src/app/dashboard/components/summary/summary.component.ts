import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from "chart.js";
import { ChartService } from '../../services/chart.service';
import { SummaryService } from '../../services/summary.service';
import { LogsService } from '../../services/logs.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {


  index!: string;
  visible!: boolean;
  line: boolean = true;
  pie: boolean = true;
  polar: boolean = true;

  selectedValue: string = '';

  logsPerMonth: Map<string, number> = new Map();
  topMessage: Map<string, number> = new Map();
  logs!: any;
  summary: Map<string, number> = new Map();


  response!: any;


  constructor(private chartService: ChartService,
              private summaryService: SummaryService,
              private logService: LogsService){}

  ngOnInit(): void {
    this.index = 'default_log_index';
    this.chartService.getTopMessage(this.index).subscribe(
      data =>{
        this.topMessage = data;
        console.log(this.index);
      }
    );

    this.chartService.getLogsPerMonth(this.index).subscribe(
      data => {
        this.logsPerMonth = data;
      });

    this.chartService.getTopMessage(this.index).subscribe(
      data => {
        this.logsPerMonth = data;
      });

    this.summaryService.getSummaryOfLogs(this.index).subscribe(data => {
        this.response = data
        this.summary = data.errorMessagePercentages;
      });



  }

  onGenerateReport(){
    this.summaryService.getReportData(this.index).subscribe(
      data => {
        this.summaryService.generateReportPDF(data).subscribe();
      }
    )
  }
  selectValue(value: string) {
    this.index = value;
    console.log('Selected value:', this.index);
    this.chartService.getTopMessage(this.index).subscribe(
      data =>{
        this.topMessage = data;
        console.log(this.index);
      }
    );

    this.chartService.getLogsPerMonth(this.index).subscribe(
      data => {
        this.logsPerMonth = data;
      });

    this.chartService.getTopMessage(this.index).subscribe(
      data => {
        this.logsPerMonth = data;
      });

    this.summaryService.getSummaryOfLogs(this.index).subscribe(data => {
        this.response = data
        this.summary = data.errorMessagePercentages;
      });
  }


}
