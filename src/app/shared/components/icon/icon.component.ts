import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { AppIcons } from '../../../core/icons';

@Component({
  selector: 'app-icon',
  templateUrl: 'icon.component.html',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class IconComponent {
  public name = input.required<string>();

  protected status = computed(() => {
    this.iconRegistry.addSvgIconLiteral(
      this.name(),
      this.sanitizer.bypassSecurityTrustHtml((AppIcons as any)[this.name()]),
    );
    return true;
  }, {});

  constructor(
    private readonly iconRegistry: MatIconRegistry,
    private readonly sanitizer: DomSanitizer,
  ) {}
}
