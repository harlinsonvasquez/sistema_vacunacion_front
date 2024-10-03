import { Component, OnInit } from '@angular/core';
import { ChildService } from '../services/child.service';
import { MunicipalityService } from '../services/municipality.service';

@Component({
  selector: 'app-vaccination-by-municipality',
  templateUrl: './vaccination-by-municipality.component.html',
  styleUrls: ['./vaccination-by-municipality.component.scss']
})
export class VaccinationByMunicipalityComponent implements OnInit {
  municipalities: any[] = [];
  vaccinatedChildren: any[] = [];
  filteredVaccinatedChildren: any[] = [];
  selectedMunicipality: number | null = null;
  page: number = 0;  
  size: number = 10; 
  totalPages: number = 0; 

  constructor(
    private childService: ChildService,
    private municipalityService: MunicipalityService
  ) {}

  ngOnInit(): void {
    this.loadMunicipalities();
  }

  loadMunicipalities(): void {
    this.municipalityService.getAllMunicipalities1().subscribe(data => {
      this.municipalities = data.content.sort((a: any, b: any) => a.name.localeCompare(b.name));
    });
  }

  filterVaccinatedChildrenByMunicipality(): void {
    if (this.selectedMunicipality) {
      this.vaccinatedChildren = [];  
      this.filteredVaccinatedChildren = [];
  
      this.childService.getVaccinatedChildrenByMunicipality(this.selectedMunicipality).subscribe(
        data => {
          console.log('Datos recibidos del backend:', data);
          if (Array.isArray(data)) {
            this.vaccinatedChildren = data;  
            this.totalPages = Math.ceil(this.vaccinatedChildren.length / this.size);
            this.page = 0;  
            this.loadPageData();  
          } else {
            console.error('Formato de respuesta incorrecto:', data);
          }
        },
        error => {
          console.error('Error al obtener los niños vacunados:', error);
        }
      );
    } else {
      this.vaccinatedChildren = [];
      this.filteredVaccinatedChildren = [];
    }
  }
  
  
  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadPageData();
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadPageData();
    }
  }
  loadPageData(): void {
    const start = this.page * this.size;
    const end = start + this.size;
    this.filteredVaccinatedChildren = this.vaccinatedChildren.slice(start, end); 
  }
  
}
