import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAccountsComponent } from './employee-accounts.component';

describe('EmployeeAccountsComponent', () => {
  let component: EmployeeAccountsComponent;
  let fixture: ComponentFixture<EmployeeAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeAccountsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
