import { TestBed } from '@angular/core/testing';

import { AlertingServiceTsService } from './alerting.service.ts.service';

describe('AlertingServiceTsService', () => {
  let service: AlertingServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertingServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
