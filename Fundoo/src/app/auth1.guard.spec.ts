import { TestBed, async, inject } from '@angular/core/testing';

import { Auth1Guard } from './auth1.guard';

describe('Auth1Guard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Auth1Guard]
    });
  });

  it('should ...', inject([Auth1Guard], (guard: Auth1Guard) => {
    expect(guard).toBeTruthy();
  }));
});
