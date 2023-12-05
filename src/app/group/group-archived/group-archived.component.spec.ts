import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupArchivedComponent } from './group-archived.component';

describe('GroupArchivedComponent', () => {
  let component: GroupArchivedComponent;
  let fixture: ComponentFixture<GroupArchivedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupArchivedComponent]
    });
    fixture = TestBed.createComponent(GroupArchivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
