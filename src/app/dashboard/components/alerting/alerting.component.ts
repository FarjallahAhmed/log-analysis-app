import { Component, OnInit } from '@angular/core';
import { AlertingServiceTsService } from '../../services/alerting.service.ts.service';
import { AlertConfiguration } from 'src/app/core/models/alertConfiguration';

@Component({
  selector: 'app-alerting',
  templateUrl: './alerting.component.html',
  styleUrls: ['./alerting.component.scss']
})
export class AlertingComponent implements OnInit {

  alertName!: string;
  triggerCondition!: string;
  timeWindow!: string;
  thresholdValue!: number;
  selectedChannels!: string;
  selectedLevels!: string;
  alertDescription!: string;
  notificationChannels: string[] = ['Email', 'SMS', 'Slack', 'Microsoft Teams'];
  escalationLevels: string[] = ['Level 1', 'Level 2', 'Level 3'];

  alertingData!: AlertConfiguration[];

  ngOnInit(): void {
    this.fetchAlertConfigurations();
  }

  constructor(private alertConfigurationService: AlertingServiceTsService){}

  saveAlertRule() {
    // Retrieve the form data
    const alertConfiguration : AlertConfiguration = {
      alertName: this.alertName,
      triggerCondition: this.triggerCondition,
      timeWindow: this.timeWindow,
      thresholdValue: this.thresholdValue,
      alertDescription: this.alertDescription,
      status: true,
      notificationChannel: this.selectedChannels,
      escalationLevel: this.selectedLevels,
      id: 0
    };

    this.alertConfigurationService.createAlertConfiguration(alertConfiguration)
    .subscribe(
      savedAlertConfiguration => {
        // Handle the successful save
        console.log('Alert Configuration saved:', savedAlertConfiguration);
        // Clear the form fields if needed
        this.resetForm();
      },
      error => {
        // Handle the error during save
        console.error('Error saving Alert Configuration:', error);
      }
    )
    this.resetForm();
  }

  fetchAlertConfigurations() {
    this.alertConfigurationService.getAllAlertConfigurations()
      .subscribe(
        alertConfigurations => {
          this.alertingData = alertConfigurations;
          console.log(this.alertingData);
        },
        error => {
          console.error('Error fetching Alert Configurations:', error);
        }
      );
  }

  resetForm() {
    // Reset the form fields to their initial state
    this.alertName = '';
    this.triggerCondition = '';
    this.timeWindow = '';
    this.thresholdValue = 0;
    this.alertDescription = '';
    this.selectedChannels = '';
    this.selectedLevels = '';
  }


}
