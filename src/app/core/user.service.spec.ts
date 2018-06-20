import { inject, TestBed } from '@angular/core/testing';
import { User } from './models/user';
import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  describe('userProfile', () => {
    it('should broadcast the last value', inject([UserService], (service: UserService) => {
      const userToUse = {
        name: 'Batman'
      };
      service.updateUser(userToUse as User);

      service.userProfile$.subscribe((user: User) => {
        expect(user.name).toEqual(userToUse.name);
      });
    }));

    it('should broadcast when the value changes', inject([UserService], (service: UserService) => {
      const firstUser = { name: 'Batman' };
      service.updateUser(firstUser as User);

      let isInitialValue = false;
      service.userProfile$.subscribe((user: User) => {
        if (!isInitialValue) {
          isInitialValue = true;
        } else {
          expect(user.name).toEqual(secondUser.name);
        }
      });

      const secondUser = { name: 'Joker' };
      service.updateUser(secondUser as User);
    }));
  });
});
