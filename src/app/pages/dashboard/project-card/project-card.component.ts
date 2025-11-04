import { ChangeDetectionStrategy, Component, computed, input, Signal } from '@angular/core';
import { ProjectInterface } from '../../../core/models/project.model';
import { CardComponent } from '../../../shared/components/card/card.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { MatIconButton } from '@angular/material/button';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, IconComponent, MatIconButton, BaseChartDirective, DatePipe],
  standalone: true,
})
export class ProjectCardComponent {
  public project = input.required<ProjectInterface>();

  public doughnutChartLabels: string[] = ['Завершено задач, %', 'Осталось задач, %'];

  public doughnutChartDatasets: Signal<ChartConfiguration<'doughnut'>['data']['datasets']> =
    computed(() => {
      const completedPercent = Math.floor(
        (100 / this.project().tasksTotal) * this.project().tasksCompleted,
      );

      return [
        {
          data: [completedPercent, 100 - completedPercent],
          backgroundColor: ['rgb(117,198,102)', 'rgb(47,136,182)'],
        },
      ];
    });

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
  };
}
