import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawBlockListViewComponent } from './raw-block-list-view.component';

describe('RawBlockListViewComponent', () => {
  let component: RawBlockListViewComponent;
  let fixture: ComponentFixture<RawBlockListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawBlockListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RawBlockListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
