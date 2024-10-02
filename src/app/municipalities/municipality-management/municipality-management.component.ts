import { Component, OnInit } from '@angular/core';
import { MunicipalityService } from '../../services/municipality.service';

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

  constructor(private municipalityService: MunicipalityService) { }

  ngOnInit(): void {
    this.loadMunicipalities();
  }

  loadMunicipalities() {
    this.municipalityService.getAllMunicipalities().subscribe(data => {
      this.municipalities = data.content;
    });
  }

  deleteMunicipality(id: number) {
    this.municipalityService.deleteMunicipality(id).subscribe(() => {
      this.loadMunicipalities();
    });
  }

  saveMunicipality() {
    if (this.editingMunicipality) {
      const departmentId = this.municipalityForm.departmentId ?? 0; // Asignar un valor por defecto si es null
      this.municipalityService.updateMunicipality(departmentId, this.municipalityForm).subscribe(() => {
        this.loadMunicipalities();
      });
    } else {
      this.municipalityService.createMunicipality(this.municipalityForm).subscribe(() => {
        this.loadMunicipalities();
      });
    }
  }
  editMunicipality(id: number) {
    const municipality = this.municipalities.find(m => m.id === id);
    if (municipality) {
        this.municipalityForm.name = municipality.name;
        this.municipalityForm.departmentId = municipality.departmentId;
        this.editingMunicipality = true;
    }
}
}
