import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router, RouterLink } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';

@UntilDestroy()
@Component({
  selector: 'app-sign-in',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatFormFieldModule, MatInput, MatButton, ReactiveFormsModule, RouterLink],
})
export class RegistrationComponent {
  protected registrationForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    lastname: new FormControl<string>('', [Validators.required]),
    login: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });

  protected errorStateMatcher = new ErrorStateMatcher();

  protected hasError = false;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  public registration() {
    this.registrationForm.markAllAsTouched();

    if (this.registrationForm.valid) {
      this.authService
        .registration(this.registrationForm.value)
        .pipe(untilDestroyed(this))
        .subscribe((user) => {
          if (user) {
            this.router.navigate(['/']);
          } else {
            this.hasError = true;
          }
        });
    }
  }
}
