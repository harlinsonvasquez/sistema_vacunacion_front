import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChildService } from '../../services/child.service';
import { MunicipalityService } from '../../services/municipality.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-children-management',
  templateUrl: './children-management.component.html',
  styleUrls: ['./children-management.component.scss']
})
export class ChildrenManagementComponent implements OnInit {
  children: any[] = [];
  municipalities: any[] = [];
  limitedMunicipalities: any[] = []; 
  selectedMunicipality: number | null = null;
  editingChild: boolean = false;
  childForm: FormGroup;
  page = 0;
  size = 10;
  totalPages: number = 0;

  constructor(private router: Router,private childService: ChildService,
     private municipalityService: MunicipalityService, 
     private fb: FormBuilder) 
     {
    this.childForm = this.fb.group({
      name: ['', Validators.required],
      birthDate: ['', Validators.required],
      municipalityId: ['', Validators.required]  
    });
  }

  ngOnInit(): void {
    this.loadChildren();
    this.loadMunicipalities();
    this.loadLimitedMunicipalities();
  }

  resetForm() {
    this.childForm.reset({
      name: '',
      birthDate: '',
      municipalityId: null
    });
    this.editingChild = false;
  }

  loadChildren(): void {
    this.childService.getAllChildren(this.page).subscribe(data => {
      if (data && data.content) {
        this.children = data.content;  
      } else {
        this.children = [];  
      }
    }, error => {
      console.error('Error loading children:', error);
    });
  }
  
  loadMunicipalities() {
    this.municipalityService.getAllMunicipalities1().subscribe(data => {
      this.municipalities = data.content.sort((a: any, b: any) => a.name.localeCompare(b.name));
      this.municipalities = data.content;
    });
  }
  loadLimitedMunicipalities() {
    this.municipalityService.getAllMunicipalities(this.page, this.size).subscribe(data => {
      this.limitedMunicipalities = data.content;
    });
  }

  filterChildrenByMunicipality() {
    if (this.selectedMunicipality) {
      
      this.children = [];  
  
      this.childService.getChildrenByMunicipality(this.selectedMunicipality).subscribe(
        data => {
          if (data) {
            this.children = data;  
          } else {
            this.children = []; 
          }
        },
        error => {
          console.error('Error al filtrar niños por municipio:', error);
        }
      );
    } else {
      this.loadChildren();
    }
  }
  
  

  editChild(id: number) {
    const child = this.children.find(c => c.id === id);
    if (child) {
      this.editingChild = true;
      this.childForm.patchValue({
        name: child.name,
        birthDate: child.birthDate,
        municipalityId: child.municipalityId 
      });
    }
  }

  deleteChild(id: number) {
    this.childService.deleteChild(id).subscribe(() => {
      this.loadChildren();
    });
  }

  saveChild() {
    if (this.editingChild) {
      const childId = this.children.find(c => c.name === this.childForm.get('name')?.value)?.id;
      if (childId) {
        this.childService.updateChild(childId, this.childForm.value).subscribe(() => {
          this.loadChildren();
          this.resetForm();
        }, error => {
          console.error('Error updating child:', error);
        });
      }
    } else {
      this.childService.createChild(this.childForm.value).subscribe(() => {
        this.loadChildren();
        this.resetForm();
      }, error => {
        console.error('Error creating child:', error);
      });
    }
  }

  goToVaccinationByMunicipality() {
    this.router.navigate(['/children/vaccination-by-municipality']);
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
