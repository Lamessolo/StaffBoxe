import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdherentComponent } from './view-adherent.component';

describe('ViewAdherentComponent', () => {
  let component: ViewAdherentComponent;
  let fixture: ComponentFixture<ViewAdherentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAdherentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAdherentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
