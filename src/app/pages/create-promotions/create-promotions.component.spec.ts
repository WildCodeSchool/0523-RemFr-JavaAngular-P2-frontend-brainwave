import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePromotionsComponent } from './create-promotions.component';

describe('CreatePromotionsComponent', () => {
  let component: CreatePromotionsComponent;
  let fixture: ComponentFixture<CreatePromotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePromotionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
