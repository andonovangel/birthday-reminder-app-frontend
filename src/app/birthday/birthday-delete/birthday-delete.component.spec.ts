import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayDeleteComponent } from './birthday-delete.component';

describe('BirthdayDeleteComponent', () => {
  let component: BirthdayDeleteComponent;
  let fixture: ComponentFixture<BirthdayDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BirthdayDeleteComponent]
    });
    fixture = TestBed.createComponent(BirthdayDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
