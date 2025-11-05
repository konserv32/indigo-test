import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { ProjectInterface } from '../../../../core/models/project.model';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { MatIconButton } from '@angular/material/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-timeline-widget',
  templateUrl: './timeline-widget.component.html',
  styleUrl: './timeline-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CardComponent, IconComponent, MatIconButton, DatePipe],
})
export class TimelineWidgetComponent {
  public projects = input.required<ProjectInterface[]>();

  public onDelete = output();
}
