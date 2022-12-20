import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdherentDetailsComponent } from './adherent-details.component';

describe('AdherentDetailsComponent', () => {
  let component: AdherentDetailsComponent;
  let fixture: ComponentFixture<AdherentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdherentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdherentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
