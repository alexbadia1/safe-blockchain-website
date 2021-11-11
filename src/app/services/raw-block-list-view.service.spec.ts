import { TestBed } from '@angular/core/testing';

import { RawBlockListViewService } from './raw-block-list-view.service';

describe('RawBlockListViewService', () => {
  let service: RawBlockListViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RawBlockListViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
