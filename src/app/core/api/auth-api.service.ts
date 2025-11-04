import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { UserInterface } from '../models/user.model';
import { LocalstorageEnum } from '../enums/localstorage.enum';
import { AuthDto } from '../models/auth.dto';
import { Observable, of } from 'rxjs';
import { RegistrationDto } from '../models/registration.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private readonly localStorageService: LocalStorageService) {}

  public login(authDto: AuthDto): Observable<UserInterface> {
    const users = this.localStorageService.getItem<UserInterface[]>(LocalstorageEnum.users);

    if (users) {
      const user = users.find((dbUser) => dbUser.login === authDto.login);

      if (user && user.password === authDto.password) {
        return of(user);
      }
    }

    throw new Error('Unauthorized');
  }

  public registration(registrationDto: RegistrationDto): Observable<UserInterface> {
    const users = this.localStorageService.getItem<UserInterface[]>(LocalstorageEnum.users) || [];

    if (users) {
      const user = users.find((dbUser) => dbUser.login === registrationDto.login);

      if (!user) {
        const index = users.push(registrationDto as UserInterface) - 1;

        this.localStorageService.setItem(LocalstorageEnum.users, users);

        return of(users[index]);
      }
    }

    throw new Error('Unregistered');
  }
}
