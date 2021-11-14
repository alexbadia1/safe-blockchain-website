import { TestBed } from '@angular/core/testing';

import { PeerListViewServiceService } from './peer-list-view-service.service';

describe('PeerListViewServiceService', () => {
  let service: PeerListViewServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeerListViewServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
