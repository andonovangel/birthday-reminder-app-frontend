import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayListItemComponent } from './birthday-list-item.component';

describe('BirthdayListItemComponent', () => {
  let component: BirthdayListItemComponent;
  let fixture: ComponentFixture<BirthdayListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BirthdayListItemComponent]
    });
    fixture = TestBed.createComponent(BirthdayListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
