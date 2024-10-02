import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenManagementComponent } from './children-management.component';

describe('ChildrenManagementComponent', () => {
  let component: ChildrenManagementComponent;
  let fixture: ComponentFixture<ChildrenManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildrenManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildrenManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
