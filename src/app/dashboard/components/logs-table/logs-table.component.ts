import { Component,Input,OnInit,OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LogsService } from '../../services/logs.service';
import { AlertConfiguration } from 'src/app/core/models/alertConfiguration';
import { AlertingServiceTsService } from '../../services/alerting.service.ts.service';

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
    @Input() tableData!: any[];
    @Input() ErrorlogsMessage!: any[];
    @Input() StackTraceLog!: any[];
    @Input() alertingData!: AlertConfiguration[];

    visible!: boolean;

  constructor(private logService: LogsService,
              private alertConfigurationService: AlertingServiceTsService){
  }

  ngOnInit(): void {
    this.pageLogs = [];
    //this.reloadData();

  }

  getSimpleLogs(){
    this.logService.getsimpleLogs(this.index).subscribe(data =>{
      this.pageLogs = data;
      this.totalLogs = this.pageLogs.totalElements;
      this.pageContentLogs = this.pageLogs.content;
    })
  }

  showDialog() {
    this.visible = true;
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
changeStatus(id: number,alert: AlertConfiguration) {
    alert.status = false; // Set status to false (disable)
    this.alertConfigurationService.updateAlertConfiguration(alert.id,alert)
      .subscribe(
        updatedAlert => {
          console.log('Alert status changed:', updatedAlert);
          // Perform any additional actions if needed
        },
        error => {
          console.error('Error changing Alert status:', error);
        }
      );
  }

  deleteAlert(alert: AlertConfiguration) {
    this.alertConfigurationService.deleteAlertConfiguration(alert.id)
      .subscribe(
        () => {
          console.log('Alert deleted:', alert);
          // Perform any additional actions if needed
          //this.fetchAlertConfigurations(); // Refresh the table data after deletion
        },
        error => {
          console.error('Error deleting Alert:', error);
        }
      );
  }

}
