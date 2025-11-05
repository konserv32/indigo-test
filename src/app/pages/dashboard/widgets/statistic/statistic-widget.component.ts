import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ProjectInterface } from '../../../../core/models/project.model';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-statistic-widget',
  templateUrl: './statistic-widget.component.html',
  styleUrl: './statistic-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CardComponent, IconComponent, MatIconButton],
})
export class StatisticWidgetComponent {
  public projects = input.required<ProjectInterface[]>();

  protected statistic = computed(() => {
    return this.projects().reduce(
      (prev, current) => {
        const statistic = {
          tasksTotal: prev.tasksTotal + current.tasksTotal,
          tasksCompleted: prev.tasksCompleted + current.tasksCompleted,
        };
        return {
          ...statistic,
          completedPercent: Math.floor((100 / statistic.tasksTotal) * statistic.tasksCompleted),
        };
      },
      { tasksTotal: 0, tasksCompleted: 0, completedPercent: 0 },
    );
  });
}
