import { Component, OnInit } from '@angular/core';
import { MunicipalityService } from '../../services/municipality.service';
import { ChildService } from '../../services/child.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  municipalities: any[] = [];
  selectedMunicipalityId: number | null = null;
  averageAge = 0;
  vaccinatedChildren = 0;

  constructor(
    private municipalityService: MunicipalityService,
    private childService: ChildService
  ) { }

  ngOnInit(): void {
    this.loadMunicipalities();
  }

  loadMunicipalities() {
    this.municipalityService.getAllMunicipalities().subscribe(data => {
      this.municipalities = data.content;
    });
  }

  loadStatistics() {
    if (this.selectedMunicipalityId) {
      this.childService.getAverageAgeByMunicipality(this.selectedMunicipalityId).subscribe(age => {
        this.averageAge = age;
      });

      this.childService.getChildrenByMunicipality(this.selectedMunicipalityId).subscribe(data => {
        this.vaccinatedChildren = data.content.length;
      });
    }
  }
}
