import { Component, OnInit } from '@angular/core';
import { MunicipalityService } from '../../services/municipality.service';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-municipality-management',
  templateUrl: './municipality-management.component.html',
  styleUrls: ['./municipality-management.component.scss']
})
export class MunicipalityManagementComponent implements OnInit {
  municipalities: any[] = [];
  departments: any[] = [];
  editingMunicipality: boolean = false;
  municipalityForm = {
    name: '',
    departmentId: null
  };
  page: number = 0;
  selectedMunicipalityId: number | null = null;  
  message: string = ''; 

  constructor(private municipalityService: MunicipalityService, private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.loadMunicipalities();
    this.loadDepartments();
  }

  loadMunicipalities() {
    this.municipalityService.getAllMunicipalities(this.page).subscribe(data => {
      this.municipalities = data.content;
    });
  }

  loadDepartments() {
    this.departmentService.getAllDepartments().subscribe(data => {
      this.departments = data.content;
    });
  }

  nextPage() {
    this.page++;
    this.loadMunicipalities();
  }

  prevPage() {
    this.page--;
    this.loadMunicipalities();
  }

  deleteMunicipality(id: number) {
    this.municipalityService.deleteMunicipality(id).subscribe(response => {
      this.message = response.message;  
      this.loadMunicipalities();  
    }, error => {
      this.message = 'Error al eliminar el municipio';  
    });
  }

  saveMunicipality() {
    if (this.editingMunicipality) {
      const departmentId = this.municipalityForm.departmentId ?? 0; 
      this.municipalityService.updateMunicipality(this.selectedMunicipalityId as number, this.municipalityForm).subscribe(() => {
        this.loadMunicipalities();
        this.resetForm();
      });
    } else {
      this.municipalityService.createMunicipality(this.municipalityForm).subscribe(() => {
        this.loadMunicipalities();
        this.resetForm();
      });
    }
  }

  editMunicipality(id: number) {
    const municipality = this.municipalities.find(m => m.id === id);
    if (municipality) {
      this.selectedMunicipalityId = municipality.id;  
      this.municipalityForm.name = municipality.name;
      this.municipalityForm.departmentId = municipality.departmentId;
      this.editingMunicipality = true;
    }
  }

  updateMunicipality() {
    if (this.selectedMunicipalityId) {
      const municipalityData = {
        name: this.municipalityForm.name,
        departmentId: this.municipalityForm.departmentId
      };

      this.municipalityService.updateMunicipality(this.selectedMunicipalityId, municipalityData)
        .subscribe(response => {
          console.log("Municipio actualizado", response);
          this.loadMunicipalities();  
        }, error => {
          console.error("Error al actualizar municipio", error);
        });
    }
  }

  resetForm() {
    this.municipalityForm = { name: '', departmentId: null };
    this.selectedMunicipalityId = null;
    this.editingMunicipality = false;
  }
}
