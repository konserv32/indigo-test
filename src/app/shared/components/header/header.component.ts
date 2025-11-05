import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IconComponent } from '../icon/icon.component';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, MatIconButton],
  standalone: true,
})
export class HeaderComponent {}
