import { Component, inject, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {

  isLoading: boolean = false;
  employeeList: Employee[] = [];
  error: string | null=null;

  EmployeeService = inject(EmployeeService)

  ngOnInit(): void {
    this.fetchEmployees();
    
  }
  fetchEmployees(){
    this.isLoading=true;
    this.EmployeeService.getAllEmployees().subscribe(
      (employee)=>{
      this.employeeList = employee;
      this.isLoading = false;
      },
      (err) => {
        this.error = 'Failed to fetch employees.';
        this.isLoading = false;
      }

  
    )

  }
  deleteEmployee(id: number):void{
    if(confirm("Are you sure you want to delete this employee" )){
      this.EmployeeService.deleteEmployee(id).subscribe(()=>{
        this.employeeList = this.employeeList.filter(emp=> emp.id !== id);
      })
    }

  }



}
