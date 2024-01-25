import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPillComponent } from './account-pill.component';

describe('AccountPillComponent', () => {
  let component: AccountPillComponent;
  let fixture: ComponentFixture<AccountPillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountPillComponent]
    });
    fixture = TestBed.createComponent(AccountPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
