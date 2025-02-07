import { Component } from '@angular/core';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [EmployeeFormComponent, EmployeeListComponent, CommonModule],
  templateUrl: './master.component.html',
  styleUrl: './master.component.css'
})
export class MasterComponent {

  currentComponent: string = "EmployeeList"

  changeTab(tabName: string){
    this.currentComponent = tabName;
  }

  

}
