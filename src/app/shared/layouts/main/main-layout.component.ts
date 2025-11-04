import { ChangeDetectionStrategy, Component } from "@angular/core";
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeaderComponent],
  standalone: true,
})
export class MainLayoutComponent {}
