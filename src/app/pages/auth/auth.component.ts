import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from '@angular/router';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, CardComponent],
  standalone: true,
})
export class AuthComponent {}
