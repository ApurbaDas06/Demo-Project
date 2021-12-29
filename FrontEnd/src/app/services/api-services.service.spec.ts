import { TestBed } from '@angular/core/testing';

import { ApiServicesService } from './api-services.service';

describe('APIService', () => {
  let service: ApiServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
