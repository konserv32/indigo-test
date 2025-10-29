import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatFormFieldModule, MatInput, MatButton, ReactiveFormsModule],
})
export class SignInComponent {
  protected loginForm = new FormGroup({
    login: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', Validators.required),
  });

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  public login() {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value)
        .pipe(untilDestroyed(this))
        .subscribe((user) => {
          if (user) {
            this.router.navigate(['/']);
          }
        });
    }
  }
}
