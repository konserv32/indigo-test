import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProjectInterface } from '../../../core/models/project.model';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CardComponent],
})
export class ProjectsComponent {
  public projects = input.required<ProjectInterface[]>();
}
