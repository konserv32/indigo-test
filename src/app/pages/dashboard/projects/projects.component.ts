import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ProjectInterface } from '../../../core/models/project.model';
import { CardComponent } from '../../../shared/components/card/card.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DashboardApiService } from '../../../core/api/dashboard-api.service';
import { DashboardFiltersModel } from '../../../core/models/dashboard-filters.model';
import { ProjectStatusesEnum } from '../../../core/enums/project-statuses.enum';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@UntilDestroy()
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CardComponent, ReactiveFormsModule, MatFormFieldModule, MatInput, MatInputModule, MatSelectModule],
})
export class ProjectsComponent {
  public projects = input.required<ProjectInterface[]>();

  public setFilters = output<DashboardFiltersModel>();

  protected nameFormControl = new FormControl('');
  protected statusFormControl = new FormControl('');

  constructor(protected readonly dashboardApiService: DashboardApiService) {
    this.nameFormControl.valueChanges.pipe(untilDestroyed(this)).subscribe((event) => {
      this.setFilters.emit({ name: event || '', status: this.statusFormControl.value || '' });
    });

    this.statusFormControl.valueChanges.pipe(untilDestroyed(this)).subscribe((event) => {
      this.setFilters.emit({ name: this.nameFormControl.value || '', status: event || '' });
    });
  }

  protected readonly ProjectStatusesEnum = ProjectStatusesEnum;
  protected readonly Object = Object;
}
