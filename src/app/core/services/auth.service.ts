import { Injectable } from '@angular/core';
import { UserInterface } from '../models/user.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LocalstorageEnum } from '../enums/localstorage.enum';
import { AuthDto } from '../models/auth.dto';
import { AuthApiService } from '../api/auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly userSubject: BehaviorSubject<UserInterface> = new BehaviorSubject<UserInterface>(
    JSON.parse(localStorage.getItem(LocalstorageEnum.user)!),
  );

  public user$: Observable<UserInterface | null> = this.userSubject.asObservable();

  constructor(private readonly authApiService: AuthApiService) {}

  public login(authDto: AuthDto): Observable<UserInterface | null> {
    return this.authApiService
      .login(authDto)
      .pipe(
        tap((user) => {
          if (user) {
            localStorage.setItem(LocalstorageEnum.user, JSON.stringify(user));
            this.userSubject.next(user);
          }
        }),
      );
  }
}
