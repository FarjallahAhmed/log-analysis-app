import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LogsService } from '../../services/logs.service';

@Component({
  selector: 'app-load-data',
  templateUrl: './load-data.component.html',
  styleUrls: ['./load-data.component.scss']
})
export class LoadDataComponent implements OnInit{


  status!: boolean;
  choice!: string;
  loadDataForm!: FormGroup;


  filePath!: string;
  folderPath!: string;
  host!: string;
  port!: string;
  pattern!: string;

  constructor(private formbuilder: FormBuilder,private logService: LogsService){}

  ngOnInit(): void {
    this.status = false;
    this.loadDataForm = this.formbuilder.group({
      filePath: [null],
      pattern: [null],
      folderPath: [null],
      host:[null],
      port:[null]
    });
  }

  onSelected(value: string) {
    this.choice = value;
    this.status = true;
  }

  onSubmitForm(){

    this.filePath = this.loadDataForm.value['filePath'];
    this.pattern = this.loadDataForm.value['pattern'];
    this.folderPath = this.loadDataForm.value['folderPath'];
    this.host = this.loadDataForm.value['host'];
    this.port = this.loadDataForm.value['port'];

    console.log("test");

    if(this.filePath !== null){
      this.logService.loadDataFromFile(this.filePath,this.pattern,this.filePath).subscribe(() =>{
        console.log("Data loaded successfully");
      });
      console.log(this.filePath);
      console.log(this.pattern);
    }

  }

}
