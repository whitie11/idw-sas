import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SasChecksComponent } from './sas-checks.component';

describe('SasChecksComponent', () => {
  let component: SasChecksComponent;
  let fixture: ComponentFixture<SasChecksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SasChecksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SasChecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
