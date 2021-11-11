import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredBlockComponent } from './filtered-block.component';

describe('FilteredBlockComponent', () => {
  let component: FilteredBlockComponent;
  let fixture: ComponentFixture<FilteredBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilteredBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
