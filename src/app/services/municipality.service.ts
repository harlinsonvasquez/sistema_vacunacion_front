import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityService {
  private apiUrl = 'http://localhost:8080/api/v1/municipalities';

  constructor(private http: HttpClient) { }

  getAllMunicipalities(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  createMunicipality(municipality: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, municipality);
  }

  updateMunicipality(id: number, municipality: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, municipality);
  }

  deleteMunicipality(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}

