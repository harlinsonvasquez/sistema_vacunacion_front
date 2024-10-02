import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../services/department.service'; // Corrige la ruta de importación // Asegúrate de importar el servicio

@Component({
  selector: 'app-department-management',
  templateUrl: './department-management.component.html',
  styleUrls: ['./department-management.component.scss']
})
export class DepartmentManagementComponent implements OnInit {
  departments: any[] = []; // Propiedad para almacenar los departamentos
  editingDepartment: boolean = false; // Indica si se está editando un departamento
  departmentId: number | null = null; // Añadir propiedad para almacenar el ID del departamento en edición
  departmentForm = { // Formulario para el departamento
    name: '',
  };

  constructor(private departmentService: DepartmentService) { } // Inyecta el servicio

  ngOnInit(): void {
    this.loadDepartments(); // Carga los departamentos al iniciar
  }

  loadDepartments() {
    this.departmentService.getAllDepartments().subscribe(data => {
      this.departments = data; // Asigna los departamentos obtenidos
    });
  }

  editDepartment(id: number) {
    const department = this.departments.find(d => d.id === id);
    if (department) {
      this.departmentForm.name = department.name;
      this.departmentId = department.id; // Asignar el ID del departamento en edición
      this.editingDepartment = true;
    }
  }

  deleteDepartment(id: number) {
    this.departmentService.deleteDepartment(id).subscribe(() => {
      this.loadDepartments(); // Recarga los departamentos después de eliminar
    });
  }
  
  saveDepartment() {
    if (this.editingDepartment && this.departmentId !== null) {
      const departmentIdNumber = this.departmentId; 
      // Aquí debes asegurarte de que el primer parámetro sea el ID y el segundo el objeto actualizado
      this.departmentService.updateDepartment(departmentIdNumber, this.departmentForm).subscribe(() => {
        this.loadDepartments(); // Recarga los departamentos después de actualizar
        this.editingDepartment = false;
        this.departmentForm = { name: '' }; // Limpiar el formulario
      });
    } else {
      this.departmentService.createDepartment(this.departmentForm).subscribe(() => {
        this.loadDepartments(); // Recarga los departamentos después de crear
        this.departmentForm = { name: '' }; // Limpiar el formulario
      });
    }
  }
}
