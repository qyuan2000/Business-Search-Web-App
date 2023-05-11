import { TestBed } from '@angular/core/testing';

import { ShareresultService } from './shareresult.service';

describe('ShareresultService', () => {
  let service: ShareresultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareresultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
