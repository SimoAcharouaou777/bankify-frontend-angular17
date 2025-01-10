import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLoansComponent } from './employee-loans.component';

describe('EmployeeLoansComponent', () => {
  let component: EmployeeLoansComponent;
  let fixture: ComponentFixture<EmployeeLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeLoansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
