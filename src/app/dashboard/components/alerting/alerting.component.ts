import { Component } from '@angular/core';

@Component({
  selector: 'app-alerting',
  templateUrl: './alerting.component.html',
  styleUrls: ['./alerting.component.scss']
})
export class AlertingComponent {

  alertName!: string;
  triggerCondition!: string;
  timeWindow!: string;
  thresholdValue!: number;
  selectedChannels!: string[];
  selectedLevels!: string[];
  alertDescription!: string;
  notificationChannels: string[] = ['Email', 'SMS', 'Slack', 'Microsoft Teams'];
  escalationLevels: string[] = ['Level 1', 'Level 2', 'Level 3'];

  saveAlertRule() {
    // Retrieve the form data
    const formData = {
      alertName: this.alertName,
      triggerCondition: this.triggerCondition,
      timeWindow: this.timeWindow,
      thresholdValue: this.thresholdValue,
      selectedChannels: this.selectedChannels,
      selectedLevels: this.selectedLevels,
      alertDescription: this.alertDescription
    };
    console.log(formData);
    // Perform the necessary actions to save the alert rule using the form data
    // Example: Make an HTTP request or call a service

    // Reset the form fields
    this.resetForm();
  }

  resetForm() {
    // Reset the form fields to their initial values
    this.alertName = '';
    this.triggerCondition = '';
    this.timeWindow = '';
    this.thresholdValue = 0;
    this.selectedChannels = [];
    this.selectedLevels = [];
    this.alertDescription = '';
  }


}
