import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private apiUrl = 'http://127.0.0.1:5000'; // Replace with your Flask API URL

  constructor(private http: HttpClient) {}

  getSearchResults(query: string, numResults: number): Observable<any> {
    const params = { query: query, num_results: numResults };
    return this.http.post<any>(`${this.apiUrl}/getsearchresults`, params);
  }

  getHome(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/`);
  }
}
