import { TestBed } from '@angular/core/testing';

import { ExchangeListService } from './exchange-list.service';

describe('ExchangeListService', () => {
  let service: ExchangeListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExchangeListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
