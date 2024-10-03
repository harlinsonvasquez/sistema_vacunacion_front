import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  childForm: FormGroup;
  page = 0;
  size = 10;
  totalPages: number = 0;

  constructor(private childService: ChildService, private municipalityService: MunicipalityService, private fb: FormBuilder) {
   
    this.childForm = this.fb.group({
      name: ['', Validators.required],
      birthDate: ['', Validators.required],
      municipalityId: ['', Validators.required] 
  });
  }

  ngOnInit(): void {
    this.loadChildren();
    this.loadMunicipalities();
  }

  resetForm() {
    this.childForm.reset({
      name: '',
      birthDate: '',
      municipalityId: null
    });
    this.editingChild = false;
  }

  loadChildren(page: number = 0, size: number = 10): void {
    this.childService.getAllChildren(page, size).subscribe(data => {
        if (data && data.content) {
            this.children = data.content;
        } else {
            this.children = [];
        }
        this.totalPages = data.totalPages;
    }, error => {
        console.error('Error loading children:', error);
    });
}

  loadMunicipalities() {
    this.municipalityService.getAllMunicipalities1().subscribe(data => {
      this.municipalities = data.content;
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
    const child = this.children.find(c => c.id === id);
    if (child) {
      this.editingChild = true;
      this.childForm.patchValue({
        name: child.name,
        birthDate: child.birthDate,
        municipalityId: child.municipality.id
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
      const childId = this.children.find(c => c.name === this.childForm.get('name')?.value)?.id;  // Obtener el ID correcto
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
