import { Component } from '@angular/core';
import { EventLogService } from '../event-log.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './event-form.component.html',
})
export class EventFormComponent {
  description = '';

  constructor(private eventLogService: EventLogService) {}

  onSubmit(): void {
    if (this.description) {
      this.eventLogService.addEvent(this.description);
      this.description = ''; 
    }
  }
}
