import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalityManagementComponent } from './municipality-management.component';

describe('MunicipalityManagementComponent', () => {
  let component: MunicipalityManagementComponent;
  let fixture: ComponentFixture<MunicipalityManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MunicipalityManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MunicipalityManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
