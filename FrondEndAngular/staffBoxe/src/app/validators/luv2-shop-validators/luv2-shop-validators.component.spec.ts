import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Luv2ShopValidatorsComponent } from './luv2-shop-validators.component';

describe('Luv2ShopValidatorsComponent', () => {
  let component: Luv2ShopValidatorsComponent;
  let fixture: ComponentFixture<Luv2ShopValidatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Luv2ShopValidatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Luv2ShopValidatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
