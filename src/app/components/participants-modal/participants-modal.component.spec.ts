import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsModalComponent } from './participants-modal.component';

describe('ParticipantsModalComponent', () => {
  let component: ParticipantsModalComponent;
  let fixture: ComponentFixture<ParticipantsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
