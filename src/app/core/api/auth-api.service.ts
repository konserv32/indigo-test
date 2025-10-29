import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { UserInterface } from '../models/user.model';
import { LocalstorageEnum } from '../enums/localstorage.enum';
import { AuthDto } from '../models/auth.dto';
import { from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private readonly localStorageService: LocalStorageService) {}

  public login(authDto: AuthDto): Observable<UserInterface | null> {
    const users = this.localStorageService.getItem<UserInterface[]>(LocalstorageEnum.users);

    if (users) {
      const user = users.find((dbUser)=> dbUser.login === authDto.login)

      if (user && user.password === authDto.password) {
        return of(user)
      }
    }

    return of(null)
  }
}
