import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;  // Ensure it's defined
  isEditMode: boolean = false;
  employeeId: number | null = null;
  EmployeeService = inject(EmployeeService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  fb = inject(FormBuilder);

  constructor() {
    this.initForm(); // Initialize form in constructor
  }

  ngOnInit(): void {
    // Check if the form is in edit mode
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.employeeId = +id;
        this.loadEmployeeData(this.employeeId);
      }
    });
  }

  initForm(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      education: ['', Validators.required],
      company: ['', Validators.required],
      experience: [0, [Validators.required, Validators.min(0)]],
      package: [0, [Validators.required, Validators.min(0)]],
    });
  }

  loadEmployeeData(id: number): void {
    this.EmployeeService.getEmployeeById(id).subscribe(employee => {
      this.employeeForm.patchValue(employee);
    });
  }

  onSubmit(): void {
    if (!this.employeeForm) return;
    if (this.employeeForm.invalid) return;

    const employeeData: Partial<Employee> = this.employeeForm.value;

    if (this.isEditMode && this.employeeId !== null) {
      this.EmployeeService.updateEmployee(this.employeeId, employeeData).subscribe(() => {
        alert('Employee updated successfully!');
        this.router.navigate(['/employees']);  // Redirect to employee list
      });
    } else {
      this.EmployeeService.AddEmployee(employeeData).subscribe(() => {
        alert('Employee added successfully!');
        this.router.navigate(['/employees']);  // Redirect to employee list
      });
    }
  }
}
