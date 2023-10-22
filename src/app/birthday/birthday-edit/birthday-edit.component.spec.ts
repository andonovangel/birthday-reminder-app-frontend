import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayEditComponent } from './birthday-edit.component';

describe('BirthdayEditComponent', () => {
  let component: BirthdayEditComponent;
  let fixture: ComponentFixture<BirthdayEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BirthdayEditComponent]
    });
    fixture = TestBed.createComponent(BirthdayEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
