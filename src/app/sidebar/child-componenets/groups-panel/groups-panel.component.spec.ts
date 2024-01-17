import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsPanelComponent } from './groups-panel.component';

describe('GroupsPanelComponent', () => {
  let component: GroupsPanelComponent;
  let fixture: ComponentFixture<GroupsPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupsPanelComponent]
    });
    fixture = TestBed.createComponent(GroupsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
