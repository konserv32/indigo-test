import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  standalone: true,
})
export class HeaderComponent {}
