import { Component, OnInit } from '@angular/core';
import { SummaryService } from '../../services/summary.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  response!: any;
  summaryData$!: any;


  constructor(private summaryService: SummaryService){}

  ngOnInit(): void {
    this.summaryService.getSummaryOfLogs().subscribe(data => {

      this.response = data;
      console.log(this.response);

    });
  }

}
