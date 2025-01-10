import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeInvoicesComponent } from './employee-invoices.component';

describe('EmployeeInvoicesComponent', () => {
  let component: EmployeeInvoicesComponent;
  let fixture: ComponentFixture<EmployeeInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeInvoicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
