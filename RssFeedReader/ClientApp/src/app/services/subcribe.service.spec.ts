/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubcribeService } from './subcribe.service';

describe('Service: Subcribe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubcribeService]
    });
  });

  it('should ...', inject([SubcribeService], (service: SubcribeService) => {
    expect(service).toBeTruthy();
  }));
});
