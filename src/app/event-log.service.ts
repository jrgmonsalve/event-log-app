import { Injectable } from '@angular/core';

interface EventLog {
  description: string;
  date: Date;
  type: 'API' | 'FORM'; // Solo dos tipos permitidos
}

@Injectable({
  providedIn: 'root',
})
export class EventLogService {
  private events: EventLog[] = [];

  getEvents(): EventLog[] {
    return this.events;
  }

  addEvent(description: string): void {
    const newEvent: EventLog = {
      description,
      date: new Date(),
      type: 'FORM', // Tipo fijo para los registros
    };
    this.events.push(newEvent);
  }
}
