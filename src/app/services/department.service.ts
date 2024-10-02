import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  // La URL de tu API, que incluye el contexto `/api/v1` y el endpoint `/departments`
  public apiUrl = 'http://localhost:8080/api/v1/departments'; 

  constructor(private http: HttpClient) { }

  getAllDepartments(page: number = 0, size: number = 10): Observable<any> {
    // Utilizando parámetros para paginación
    return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  createDepartment(department: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, department);
  }

  updateDepartment(id: number, department: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, department);
  }

  deleteDepartment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
