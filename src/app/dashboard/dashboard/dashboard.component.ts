import { Component, OnInit } from '@angular/core';
import { ChildService } from '../../services/child.service';
import { MunicipalityService } from '../../services/municipality.service';
import { VaccineService } from '../../services/vaccine.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalChildren = 0;
  totalMunicipalities = 0;
  totalVaccines = 0;
  averageAge = 0;

  constructor(
    private childService: ChildService,
    private municipalityService: MunicipalityService,
    private vaccineService: VaccineService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.childService.getAllChildren().subscribe(data => this.totalChildren = data.totalElements);
    this.municipalityService.getAllMunicipalities().subscribe(data => this.totalMunicipalities = data.totalElements);
    this.vaccineService.getAllVaccines().subscribe(data => this.totalVaccines = data.totalElements);
    this.childService.getAverageAgeByMunicipality(1).subscribe(age => this.averageAge = age);
  }
}

