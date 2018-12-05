import { TestBed } from '@angular/core/testing';

import { LoggerServiceService } from './logger-service.service';

describe('LoggerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoggerServiceService = TestBed.get(LoggerServiceService);
    expect(service).toBeTruthy();
  });
});
