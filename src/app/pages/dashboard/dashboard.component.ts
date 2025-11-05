import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { DashboardApiService } from '../../core/api/dashboard-api.service';
import { ProjectInterface } from '../../core/models/project.model';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { DoughnutController } from 'chart.js';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { delay } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProgressWidgetComponent } from './widgets/progress/progress-widget.component';
import { WidgetsService } from '../../core/services/widgets.service';
import { StatisticWidgetComponent } from './widgets/statistic/statistic-widget.component';

@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [DashboardApiService, provideCharts(withDefaultRegisterables(DoughnutController))],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CdkDropList, CdkDrag, ProgressWidgetComponent, StatisticWidgetComponent],
})
export class DashboardComponent {
  protected page = signal<number>(1);

  public projects = signal<ProjectInterface[]>([]);

  constructor(
    private readonly dashboardApiService: DashboardApiService,
    public readonly widgetsService: WidgetsService,
  ) {
    effect(() => {
      this.dashboardApiService
        .getProjects(this.page())
        .pipe(delay(1000), untilDestroyed(this))
        .subscribe((projects) => this.projects.update(() => projects));
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousIndex !== event.currentIndex) {
      const projects = this.projects();
      moveItemInArray(projects, event.previousIndex, event.currentIndex);
      this.dashboardApiService.changeProjectPositions(projects);
    }
  }
}
