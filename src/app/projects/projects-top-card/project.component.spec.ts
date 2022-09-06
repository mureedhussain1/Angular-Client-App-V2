import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProjectTopCardComponent } from './project-card.component';

describe('TopCardComponent', () => {
  let component: ProjectTopCardComponent;
  let fixture: ComponentFixture<ProjectTopCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTopCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTopCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
