import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPromotionsComponent } from './user-promotions.component';

describe('UserPromotionsComponent', () => {
  let component: UserPromotionsComponent;
  let fixture: ComponentFixture<UserPromotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPromotionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
