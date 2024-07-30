import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBrandBackgroundComponent } from './form-brand-background.component';

describe('FormBrandBackgroundComponent', () => {
  let component: FormBrandBackgroundComponent;
  let fixture: ComponentFixture<FormBrandBackgroundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormBrandBackgroundComponent]
    });
    fixture = TestBed.createComponent(FormBrandBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
