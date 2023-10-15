import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayCreateComponent } from './birthday-create.component';

describe('BirthdayCreateComponent', () => {
  let component: BirthdayCreateComponent;
  let fixture: ComponentFixture<BirthdayCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BirthdayCreateComponent]
    });
    fixture = TestBed.createComponent(BirthdayCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
