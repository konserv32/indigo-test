import { Injectable, signal } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { LocalstorageEnum } from '../enums/localstorage.enum';
import { WidgetInterface } from '../models/widget.model';

@Injectable({
  providedIn: 'root',
})
export class WidgetsService {
  public widgets = signal<WidgetInterface[]>([]);

  public lastIndex = signal<number>(0);

  constructor(private readonly localStorageService: LocalStorageService) {
    const widgets = this.localStorageService.getItem<WidgetInterface[]>(LocalstorageEnum.widgets);

    widgets?.forEach((widget: WidgetInterface) => {
      if (widget.id > this.lastIndex()) {
        this.lastIndex.set(widget.id + 1);
      }
    });

    if (widgets) {
      this.widgets.set(widgets);
    }
  }

  public saveWidgetPositions(widgets: WidgetInterface[]) {
    this.localStorageService.setItem(LocalstorageEnum.widgets, widgets);
  }

  public addWidget(widget: WidgetInterface) {
    this.widgets.set([...this.widgets(), widget]);
    this.lastIndex.set(this.lastIndex() + 1);

    this.saveWidgetPositions(this.widgets());
  }

  public removeWidget(id: number) {
    this.widgets.set(this.widgets().filter((widget: WidgetInterface) => widget.id !== id));

    this.saveWidgetPositions(this.widgets());
  }
}
