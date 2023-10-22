import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayArchivedComponent } from './birthday-archived.component';

describe('BirthdayArchivedComponent', () => {
  let component: BirthdayArchivedComponent;
  let fixture: ComponentFixture<BirthdayArchivedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BirthdayArchivedComponent]
    });
    fixture = TestBed.createComponent(BirthdayArchivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
