import { Component, OnInit } from '@angular/core';
import { ChildService } from '../../services/child.service';
import { MunicipalityService } from '../../services/municipality.service';

@Component({
  selector: 'app-children-management',
  templateUrl: './children-management.component.html',
  styleUrls: ['./children-management.component.scss']
})
export class ChildrenManagementComponent implements OnInit {
  children: any[] = [];
  municipalities: any[] = [];
  selectedMunicipality: number | null = null;
  editingChild: boolean = false;
  childForm = {
    name: '',
    birthDate: '',
    municipalityId: null
  };
  page = 0;
  size = 10;
  totalPages: number=0;
  constructor(private childService: ChildService, private municipalityService: MunicipalityService) { }

  ngOnInit(): void {
    this.loadChildren();
    this.loadMunicipalities();
  }

  loadChildren(page: number = 0, size: number = 10): void {
    this.childService.getAllChildren(page, size).subscribe(data => {
      this.children = data.content; 
     console.log(data);
      
      this.totalPages = data.totalPages; 
    }, error => {
      console.error('Error loading children:', error);
    });
  }
  

  loadMunicipalities() {
    this.municipalityService.getAllMunicipalities().subscribe(data => {
      this.municipalities = data.content;
      console.log(data);
    });
  }

  filterChildrenByMunicipality() {
    if (this.selectedMunicipality) {
      this.childService.getChildrenByMunicipality(this.selectedMunicipality).subscribe(data => {
        this.children = data.content;
      });
    } else {
      this.loadChildren();
    }
  }

  editChild(id: number) {
    this.editingChild = true;
    // Lógica para cargar los datos del niño seleccionado y asignarlos a childForm
  }

  deleteChild(id: number) {
    this.childService.deleteChild(id).subscribe(() => {
      this.loadChildren();
    });
  }

  saveChild() {
    if (this.editingChild) {
      const municipalityId = this.childForm.municipalityId ?? 0; 
      this.childService.updateChild(municipalityId, this.childForm).subscribe(() => {
        this.loadChildren();
      });
    } else {
      this.childService.createChild(this.childForm).subscribe(() => {
        this.loadChildren();
      });
    }
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.loadChildren();
    }
  }

  nextPage() {
    this.page++;
    this.loadChildren();
  }
}
