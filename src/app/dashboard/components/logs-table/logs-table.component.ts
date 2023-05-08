import { Component,Input,OnInit,OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LogsService } from '../../services/logs.service';

@Component({
  selector: 'app-logs-table',
  templateUrl: './logs-table.component.html',
  styleUrls: ['./logs-table.component.scss']
})
export class LogsTableComponent implements OnInit{

  // pagination
    totalLogs!: number;
    itemLogs = 5 ;
    selectedPageLogs = 0;
    pageContentLogs!: any;
    pLogs: number = 1;
    pageLogs!: any;
    @Input() index!: string;

  constructor(private logsService: LogsService,private logService: LogsService){
  }

  ngOnInit(): void {
    this.pageLogs = [];
    this.reloadData();

  }

  getSimpleLogs(){
    this.logService.getsimpleLogs(this.index).subscribe(data =>{
      this.pageLogs = data;
      this.totalLogs = this.pageLogs.totalElements;
      this.pageContentLogs = this.pageLogs.content;
    })
  }




  /** Pagination: Change page number */
  getItems(itemsNumber: number) {
    this.itemLogs = itemsNumber;
    this.onSelect(1);
  }

  onSelect(pageNumber: number) {
    this.selectedPageLogs = pageNumber - 1;
    this.getSimpleLogs();
  }
  reloadData() {
    this.pageLogs = this.getSimpleLogs();
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['index'] && !changes['index'].firstChange) {
      this.reloadData();
    }
  }


}
