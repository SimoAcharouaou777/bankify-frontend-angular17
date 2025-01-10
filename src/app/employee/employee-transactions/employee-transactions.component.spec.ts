import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTransactionsComponent } from './employee-transactions.component';

describe('EmployeeTransactionsComponent', () => {
  let component: EmployeeTransactionsComponent;
  let fixture: ComponentFixture<EmployeeTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeTransactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
