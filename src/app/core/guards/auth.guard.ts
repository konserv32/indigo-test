import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authenticationService: AuthService,
  ) {}

  public canActivate() {
    const user = this.authenticationService.userValue;

    if (user) {
      return true;
    }

    this.router.navigate(['/auth/sign-in']);

    return false;
  }
}
