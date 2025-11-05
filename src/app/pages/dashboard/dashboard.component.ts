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
import { WidgetsEnum } from '../../core/enums/widgets.enum';
import { MatButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

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
    MatButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
  ],
})
export class DashboardComponent {
  private readonly localStorageService: LocalStorageService = inject(LocalStorageService);
  public readonly widgetsService: WidgetsService = inject(WidgetsService);

  protected filters = signal<DashboardFiltersModel>(
    this.localStorageService.getItem<DashboardFiltersModel>(LocalstorageEnum.filters) || {
      name: '',
      status: '',
    },
  );

  public projects = signal<ProjectInterface[]>([]);

  protected widgets = this.widgetsService.widgets;

  constructor(private readonly dashboardApiService: DashboardApiService) {
    effect(() => {
      this.dashboardApiService
        .getProjects(this.filters())
        .pipe(delay(1000), untilDestroyed(this))
        .subscribe((projects) => this.projects.set(projects));
    });
  }

  protected drop(event: CdkDragDrop<string[]>) {
    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(this.widgets(), event.previousIndex, event.currentIndex);
      this.widgetsService.saveWidgetPositions(this.widgets());
    }
  }

  public setFilters(filters: DashboardFiltersModel) {
    this.filters.set(filters);
  }

  public addWidget(name: string) {
    this.widgetsService.addWidget({name, id: this.widgetsService.lastIndex() });
  }

  public removeWidget(id: number) {
    this.widgetsService.removeWidget(id);
  }

  protected readonly WidgetsEnum = WidgetsEnum;
  protected readonly Object = Object;
}
