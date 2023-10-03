import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayDetailComponent } from './birthday-detail.component';

describe('BirthdayDetailComponent', () => {
  let component: BirthdayDetailComponent;
  let fixture: ComponentFixture<BirthdayDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BirthdayDetailComponent]
    });
    fixture = TestBed.createComponent(BirthdayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
