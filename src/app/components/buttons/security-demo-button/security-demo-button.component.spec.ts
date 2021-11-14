import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityDemoButtonComponent } from './security-demo-button.component';

describe('SecurityDemoButtonComponent', () => {
  let component: SecurityDemoButtonComponent;
  let fixture: ComponentFixture<SecurityDemoButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityDemoButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityDemoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
