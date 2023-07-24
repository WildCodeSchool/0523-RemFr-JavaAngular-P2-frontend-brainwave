import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDiscussionsComponent } from './user-discussions.component';

describe('UserDiscussionsComponent', () => {
  let component: UserDiscussionsComponent;
  let fixture: ComponentFixture<UserDiscussionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDiscussionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDiscussionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
