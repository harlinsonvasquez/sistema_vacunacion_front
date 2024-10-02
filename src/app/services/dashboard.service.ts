import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getAllChildren(): Observable<any> {
    return this.http.get(`${this.apiUrl}/children/getAllChildren`);
  }

  getAllMunicipalities(): Observable<any> {
    return this.http.get(`${this.apiUrl}/municipalities`);
  }

  getAllVaccines(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vaccines`);
  }

  getAverageAgeByMunicipality(municipalityId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/children/municipality/${municipalityId}/average-age`);
  }
}
