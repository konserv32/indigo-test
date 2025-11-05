import { ChangeDetectionStrategy, Component, computed, input, Signal } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ProjectInterface } from '../../../../core/models/project.model';
import { BaseChartDirective } from 'ng2-charts';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-progress-widget',
  templateUrl: './progress-widget.component.html',
  styleUrl: './progress-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [BaseChartDirective, CardComponent, IconComponent, MatIconButton],
})
export class ProgressWidgetComponent {
  public projects = input.required<ProjectInterface[]>();

  private data = computed(()=>{
    return this.projects().reduce((prev, current)=>{
      return [prev[0] + current.tasksCompleted, prev[1] + current.tasksTotal - current.tasksCompleted ];
    }, [0, 0]);

  })

  public doughnutChartLabels: string[] = ['Завершено задач', 'Осталось задач'];

  public doughnutChartDatasets: Signal<ChartConfiguration<'doughnut'>['data']['datasets']> =
    computed(() => {
      return [
        {
          data: this.data(),
          backgroundColor: ['rgb(117,198,102)', 'rgb(47,136,182)'],
        },
      ];
    });

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
  };
}
