import { TestBed } from '@angular/core/testing';

import { Cidadao } from './cidadao';

describe('Cidadao', () => {
  let service: Cidadao;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cidadao);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
