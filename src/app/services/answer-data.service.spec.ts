import { TestBed } from '@angular/core/testing';

import { AnswerDataService } from './answer-data.service';

describe('AnswerDataService', () => {
  let service: AnswerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswerDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
