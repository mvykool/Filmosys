import { TestBed } from '@angular/core/testing';

import { OpenSesameService } from './open-sesame.service';

describe('OpenSesameService', () => {
  let service: OpenSesameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenSesameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
