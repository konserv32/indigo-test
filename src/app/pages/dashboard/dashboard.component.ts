import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { DashboardApiService } from '../../core/api/dashboard-api.service';
import { ProjectInterface } from '../../core/models/project.model';
import { ProjectCardComponent } from './project-card/project-card.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { DoughnutController } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [DashboardApiService, provideCharts(withDefaultRegisterables(DoughnutController))],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ProjectCardComponent],
})
export class DashboardComponent {
  protected page = signal<number>(1);

  public projects = signal<ProjectInterface[]>([]);

  constructor(private readonly dashboardApiService: DashboardApiService) {
    effect(() => {
      this.dashboardApiService
        .getProjects(this.page())
        .pipe()
        .subscribe((projects) => this.projects.update(() => projects));
    });
  }
}
