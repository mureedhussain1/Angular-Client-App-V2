import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmployeeTopCardComponent } from './employee-card.component';

describe('TopCardComponent', () => {
  let component: EmployeeTopCardComponent;
  let fixture: ComponentFixture<EmployeeTopCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeTopCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTopCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
