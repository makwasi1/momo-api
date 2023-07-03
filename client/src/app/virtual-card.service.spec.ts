import { TestBed } from '@angular/core/testing';

import { VirtualCardService } from './virtual-card.service';

describe('VirtualCardService', () => {
  let service: VirtualCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirtualCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
