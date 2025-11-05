import { ChangeDetectionStrategy, Component, effect, signal, inject } from '@angular/core';
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
import { TimelineWidgetComponent } from './widgets/timeline/timeline-widget.component';
import { ProjectsComponent } from './projects/projects.component';
import { DashboardFiltersModel } from '../../core/models/dashboard-filters.model';
import { LocalstorageEnum } from '../../core/enums/localstorage.enum';
import { LocalStorageService } from '../../core/services/local-storage.service';

@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [DashboardApiService, provideCharts(withDefaultRegisterables(DoughnutController))],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CdkDropList,
    CdkDrag,
    ProgressWidgetComponent,
    StatisticWidgetComponent,
    TimelineWidgetComponent,
    ProjectsComponent,
  ],
})
export class DashboardComponent {
  private readonly localStorageService = inject(LocalStorageService);

  protected filters = signal<DashboardFiltersModel>(
    this.localStorageService.getItem<DashboardFiltersModel>(LocalstorageEnum.filters) || {
      name: '',
      status: '',
    },
  );

  public projects = signal<ProjectInterface[]>([]);

  constructor(
    private readonly dashboardApiService: DashboardApiService,
    public readonly widgetsService: WidgetsService,
  ) {
    effect(() => {
      this.dashboardApiService
        .getProjects(this.filters())
        .pipe(delay(1000), untilDestroyed(this))
        .subscribe((projects) => this.projects.set(projects));
    });
  }

  protected drop(event: CdkDragDrop<string[]>) {
    if (event.previousIndex !== event.currentIndex) {
      const projects = this.projects();
      moveItemInArray(projects, event.previousIndex, event.currentIndex);
      this.dashboardApiService.changeProjectPositions(projects);
    }
  }

  public setFilters(filters: DashboardFiltersModel) {
    this.filters.set(filters);
  }
}
