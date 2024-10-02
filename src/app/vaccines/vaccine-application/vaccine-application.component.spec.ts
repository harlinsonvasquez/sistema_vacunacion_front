import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineApplicationComponent } from './vaccine-application.component';

describe('VaccineApplicationComponent', () => {
  let component: VaccineApplicationComponent;
  let fixture: ComponentFixture<VaccineApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccineApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccineApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
