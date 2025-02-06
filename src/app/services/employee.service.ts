import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseModel, Employee } from '../models/employee.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(environment.API_URL) ;
  }
  getEmployeeById(id:number): Observable<any>{
    return this.http.get<Employee>(`${environment.API_URL}/${id}`);
  }
  AddEmployee(employee: Partial<Employee>): Observable <any>{
    return this.http.post(environment.API_URL, employee);
  }
  updateEmployee(id: number, employee: Partial<Employee>): Observable<any>{
    return this.http.put(`${environment.API_URL}/${id}`, employee);
  }
  deleteEmployee(id: number): Observable <any>{
    return this.http.delete(`${environment.API_URL}/${id}`);
  }
}
