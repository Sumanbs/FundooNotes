import { TestBed } from '@angular/core/testing';

import { CreatelabelsService } from './createlabels.service';

describe('CreatelabelsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreatelabelsService = TestBed.get(CreatelabelsService);
    expect(service).toBeTruthy();
  });
});
