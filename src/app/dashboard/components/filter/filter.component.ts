import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit{

  logs!: any[];
  constructor(private filterService: FilterService){}

  ngOnInit(): void {
    const startDate = new Date('2022-01-01');
    const endDate = new Date('2023-01-31');
    this.filterService.filterLogsWithDateRange(startDate,endDate).subscribe(
      data =>{
        this.logs = data;
      }
    )
  }

}



