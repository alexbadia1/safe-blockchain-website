import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredBlockListViewComponent } from './filtered-block-list-view.component';

describe('FilteredBlockListViewComponent', () => {
  let component: FilteredBlockListViewComponent;
  let fixture: ComponentFixture<FilteredBlockListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilteredBlockListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredBlockListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
