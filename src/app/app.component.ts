import { Component } from '@angular/core';
import { EventFormComponent } from './event-form/event-form.component';
import { EventTableComponent } from './event-table/event-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EventFormComponent, EventTableComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
