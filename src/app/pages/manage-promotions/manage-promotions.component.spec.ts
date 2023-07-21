import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePromotionsComponent } from './manage-promotions.component';

describe('ManagePromotionsComponent', () => {
  let component: ManagePromotionsComponent;
  let fixture: ComponentFixture<ManagePromotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePromotionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
