import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeerListViewComponent } from './peer-list-view.component';

describe('PeerListViewComponent', () => {
  let component: PeerListViewComponent;
  let fixture: ComponentFixture<PeerListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeerListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeerListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
