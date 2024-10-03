import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../services/department.service'; 

@Component({
  selector: 'app-department-management',
  templateUrl: './department-management.component.html',
  styleUrls: ['./department-management.component.scss']
})
export class DepartmentManagementComponent implements OnInit {
  departments: any[] = []; 
  editingDepartment: boolean = false; 
  departmentId: number | null = null; 
  departmentForm = { 
    name: '',
  };

  constructor(private departmentService: DepartmentService) { } 

  ngOnInit(): void {
    this.loadDepartments(); 
  }

  loadDepartments() {
    this.departmentService.getAllDepartments().subscribe(data => {
      this.departments = data; 
    });
  }

  editDepartment(id: number) {
    const department = this.departments.find(d => d.id === id);
    if (department) {
      this.departmentForm.name = department.name;
      this.departmentId = department.id; 
      this.editingDepartment = true;
    }
  }

  deleteDepartment(id: number) {
    this.departmentService.deleteDepartment(id).subscribe(() => {
      this.loadDepartments(); 
    });
  }
  
  saveDepartment() {
    if (this.editingDepartment && this.departmentId !== null) {
      const departmentIdNumber = this.departmentId; 
      
      this.departmentService.updateDepartment(departmentIdNumber, this.departmentForm).subscribe(() => {
        this.loadDepartments(); 
        this.editingDepartment = false;
        this.departmentForm = { name: '' }; 
      });
    } else {
      this.departmentService.createDepartment(this.departmentForm).subscribe(() => {
        this.loadDepartments(); 
        this.departmentForm = { name: '' }; 
      });
    }
  }
}
