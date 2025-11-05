import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { WidgetsService } from '../../core/services/widgets.service';
import { ProgressWidgetComponent } from './widgets/progress/progress-widget.component';
import { StatisticWidgetComponent } from './widgets/statistic/statistic-widget.component';
import { TimelineWidgetComponent } from './widgets/timeline/timeline-widget.component';
import { WidgetsEnum } from '../../core/enums/widgets.enum';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: async () => import('./dashboard.component').then((c) => c.DashboardComponent),
    children: [
      {
        path: '',
        loadComponent: async () =>
          import('./widgets/progress/progress-widget.component').then(
            (m) => ProgressWidgetComponent,
          ),
        canMatch: [
          async () => {
            const widgetsService = inject(WidgetsService);
            return widgetsService.widgets().find((widget)=> widget.name === WidgetsEnum.progress);
          },
        ],
      },
      {
        path: '',
        loadComponent: async () =>
          import('./widgets/statistic/statistic-widget.component').then(
            (m) => StatisticWidgetComponent,
          ),
        canMatch: [
          async () => {
            const widgetsService = inject(WidgetsService);
            return widgetsService.widgets().find((widget)=> widget.name === WidgetsEnum.statistic);
          },
        ],
      },
      {
        path: '',
        loadComponent: async () =>
          import('./widgets/timeline/timeline-widget.component').then(
            (m) => TimelineWidgetComponent,
          ),
        canMatch: [
          async () => {
            const widgetsService = inject(WidgetsService);
            return widgetsService.widgets().find((widget)=> widget.name === WidgetsEnum.timeline);
          },
        ],
      },
    ],
  },
];
