import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildService {
  private apiUrl = 'http://localhost:8080/api/v1/children';

  constructor(private http: HttpClient) { }

  getAllChildren(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAllChildren?page=${page}&size=${size}`);
  }
  
  createChild(child: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, child);
  }

  updateChild(id: number, child: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, child);
  }

  deleteChild(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  getChildrenByMunicipality(municipalityId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/municipality/${municipalityId}`);
  }

  getAverageAgeByMunicipality(municipalityId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/municipality/${municipalityId}/average-age`);
  }
  applyVaccine(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/applyVaccine`, data);
  }
}

