import { TestBed } from '@angular/core/testing';

import { UserServiceService } from './user-service.service';

describe('UserServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [UserServiceService]
  }));

  it('should be created', () => {
    const service: UserServiceService = TestBed.get(UserServiceService);
    expect(service).toBeTruthy();
  });
});
