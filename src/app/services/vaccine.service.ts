import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {
  private apiUrl = 'http://localhost:8080/api/v1/vaccines';

  constructor(private http: HttpClient) { }

  getAllVaccines(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  createVaccine(vaccine: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, vaccine);
  }

  updateVaccine(id: number, vaccine: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, vaccine);
  }

  deleteVaccine(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
  applyVaccine(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/apply`, data);
  }

}
