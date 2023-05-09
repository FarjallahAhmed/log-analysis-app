import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { DefaultLog } from 'src/app/core/models/defaultLog';
import { DefaultException } from 'src/app/core/models/defaultException';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit{

  logs!: any[];
  errorMessage!: string;
  index!: string;
  exceptionList!: DefaultException[];
  loglevel!: string;
  dataList!: DefaultLog[];
  logmessage!: string;
  startDate!: Date;
  endDate!: Date;
  response!: any;
  ErrorlogsMessage!: any;
  visible!: boolean[];

  constructor(private filterService: FilterService){}

  ngOnInit(): void {
    /*const startDate = new Date('2022-01-01');
    const endDate = new Date('2023-01-31');
    this.filterService.filterLogsWithDateRange(startDate,endDate,"default_log_index").subscribe(
      data =>{
        this.logs = data;
        console.log(this.logs);
      }
    )*/
  }



  filterErrorException(): void {
    this.filterService.filterErrorException(this.errorMessage, this.index)
      .subscribe(

        (response: DefaultException[]) => {
          this.exceptionList = response;
        },
        (error) => {
          console.error('An error occurred:', error);
        }
      );
  }

  filterLogLevel(): void {
    this.filterService.filterLogLevel(this.loglevel, this.index)
      .subscribe(
        (response: DefaultLog[]) => {
          this.dataList = response;
        },
        (error) => {
          console.error('An error occurred:', error);

        }
      );
  }

  filterLogByMessage(): void {
    this.filterService.filterLogByMessage(this.logmessage, this.index)
      .subscribe(
        (response: DefaultLog[]) => {
          this.dataList = response;
        },
        (error) => {
          console.error('An error occurred:', error);
        }
      );
  }

  getLogsByDateRange(): void {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);

    this.filterService.getLogsByDateRange(startDate, endDate, this.index)
      .subscribe(
        (response: any) => {
          this.response = response;
          console.log(this.response)
        },
        (error) => {
          console.error('An error occurred:', error);

        }
      );
  }

  selectValue(value: string) {
    this.index = value;
    console.log('Selected value:', this.index);
  }

}



