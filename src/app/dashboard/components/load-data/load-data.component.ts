import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private formbuilder: FormBuilder){}

  ngOnInit(): void {
    this.status = false;
    this.loadDataForm = this.formbuilder.group({
      filePath: [null],
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
    this.folderPath = this.loadDataForm.value['folderPath'];
    this.host = this.loadDataForm.value['host'];
    this.port = this.loadDataForm.value['port'];

  }

}
