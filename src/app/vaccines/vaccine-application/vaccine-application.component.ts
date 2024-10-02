import { Component, OnInit } from '@angular/core';
import { VaccineService } from '../../services/vaccine.service';
import { ChildService } from '../../services/child.service';

@Component({
  selector: 'app-vaccine-application',
  templateUrl: './vaccine-application.component.html',
  styleUrls: ['./vaccine-application.component.scss']
})
export class VaccineApplicationComponent implements OnInit {
  children: any[] = [];
  vaccines: any[] = [];
  selectedChildId: number | null = null;
  selectedVaccineId: number | null = null;
  appliedVaccines: any[] = [];

  constructor(
    private vaccineService: VaccineService,
    private childService: ChildService
  ) { }

  ngOnInit(): void {
    this.loadChildren();
    this.loadVaccines();
  }

  loadChildren() {
    this.childService.getAllChildren().subscribe(data => {
      this.children = data.content;
    });
  }

  loadVaccines() {
    this.vaccineService.getAllVaccines().subscribe(data => {
      this.vaccines = data.content;
    });
  }

  applyVaccine() {
    if (this.selectedChildId && this.selectedVaccineId) {
      const data = {
        childId: this.selectedChildId,
        vaccineId: this.selectedVaccineId
      };
      this.vaccineService.applyVaccine(data).subscribe(response => {
        this.loadAppliedVaccines();
      }, error => {
        console.error('Error applying vaccine:', error);
      });
    } else {
      console.error('Please select both a child and a vaccine.');
    }
  }

  loadAppliedVaccines() {
    if (this.selectedChildId) {
      this.childService.getChildrenByMunicipality(this.selectedChildId).subscribe(data => {
        this.appliedVaccines = data.content;
      });
    }
  }
}
