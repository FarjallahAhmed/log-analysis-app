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


  fileLogPath!: string;
  logstashConfigFile!:string;
  folderPath!: string;
  host!: string;
  port!: string;
  pattern!: string;

  constructor(private formbuilder: FormBuilder,private logService: LogsService){}

  ngOnInit(): void {
    this.status = false;
    this.loadDataForm = this.formbuilder.group({
      fileLogPath: [null],
      logstashConfigFile: [null],
      pattern: ["pattern"],
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

    this.fileLogPath = this.loadDataForm.value['fileLogPath'];
    this.logstashConfigFile = this.loadDataForm.value['logstashConfigFile'];
    this.pattern = this.loadDataForm.value['pattern'];
    this.folderPath = this.loadDataForm.value['folderPath'];
    this.host = this.loadDataForm.value['host'];
    this.port = this.loadDataForm.value['port'];
    console.log("folder ",this.fileLogPath);
/*
    console.log("log data ",this.fileLogPath);
    console.log("logstash config",this.logstashConfigFile);
*/
    if(this.fileLogPath !== null){

      this.logService.loadDataFromFile(this.fileLogPath,this.pattern,this.logstashConfigFile).subscribe(() =>{
        console.log("Data loaded successfully");
      });
      console.log("from file logstash conf",this.logstashConfigFile);
      console.log("from file log path ",this.fileLogPath);
      }
    if(this.folderPath !== null){
        this.logService.loadDataFromDirectory(this.folderPath,this.logstashConfigFile).subscribe(() =>{
            console.log("Data loaded successfully");
        });
        console.log("from directory logstash conf",this.logstashConfigFile);
        console.log("from directory folder log",this.folderPath);
    }

  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.logstashConfigFile = file.name;
      this.loadDataForm.value["logstashConfigFile"] = file.name;
      //console.log("from on select file logstash conf",this.logstashConfigFile);
    }
  }

  onFileSelectedLog(event: any) {
    const file = event.target.files[0];
    if (file) {
      //this.fileLogPath = file.name;

      this.loadDataForm.value["fileLogPath"] = file.name;
    }
  }


}
