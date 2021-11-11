import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawBlockComponent } from './raw-block.component';

describe('RawBlockComponent', () => {
  let component: RawBlockComponent;
  let fixture: ComponentFixture<RawBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RawBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
