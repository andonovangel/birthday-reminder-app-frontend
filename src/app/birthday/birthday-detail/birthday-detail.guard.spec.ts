import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { BirthdayDetailGuard } from './birthday-detail.guard';

describe('BirthdayDetailGuard', () => {
  let guard: BirthdayDetailGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BirthdayDetailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
