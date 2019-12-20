import { TestBed } from '@angular/core/testing';

import { SaleService } from './sale.service';

describe('SaleService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [SaleService]
  }));

  it('should be created', () => {
    const service: SaleService = TestBed.get(SaleService);
    expect(service).toBeTruthy();
  });
});
