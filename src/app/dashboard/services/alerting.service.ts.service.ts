import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertConfiguration } from 'src/app/core/models/alertConfiguration';


@Injectable({
  providedIn: 'root'
})
export class AlertingServiceTsService {

  private baseUrl = 'http://localhost:8080/api/alert-configurations';

  constructor(private http: HttpClient) {}

  createAlertConfiguration(alertConfiguration: AlertConfiguration): Observable<AlertConfiguration> {
    return this.http.post<AlertConfiguration>(this.baseUrl, alertConfiguration);
  }

  getAllAlertConfigurations(): Observable<AlertConfiguration[]> {
    return this.http.get<AlertConfiguration[]>(this.baseUrl);
  }

  getAlertConfigurationById(id: number): Observable<AlertConfiguration> {
    return this.http.get<AlertConfiguration>(`${this.baseUrl}/${id}`);
  }

  updateAlertConfiguration(id: number, updatedAlertConfiguration: AlertConfiguration): Observable<AlertConfiguration> {
    return this.http.put<AlertConfiguration>(`${this.baseUrl}/${id}`, updatedAlertConfiguration);
  }

  deleteAlertConfiguration(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  triggerAlert(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/trigger`,null);
  }
}
