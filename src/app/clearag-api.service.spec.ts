import { TestBed } from '@angular/core/testing';

import { ClearagApiService } from './clearag-api.service';

describe('ClearagApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClearagApiService = TestBed.get(ClearagApiService);
    expect(service).toBeTruthy();
  });
});
