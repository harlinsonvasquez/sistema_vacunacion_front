import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationByMunicipalityComponent } from './vaccination-by-municipality.component';

describe('VaccinationByMunicipalityComponent', () => {
  let component: VaccinationByMunicipalityComponent;
  let fixture: ComponentFixture<VaccinationByMunicipalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinationByMunicipalityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccinationByMunicipalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
