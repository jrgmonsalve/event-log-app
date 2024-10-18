import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventLogService } from '../event-log.service';

interface EventLog {
  description: string;
  date: Date;
  type: 'API' | 'FORM';
}

@Component({
  selector: 'app-event-table',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './event-table.component.html',
})
export class EventTableComponent implements OnInit {
  events: EventLog[] = [];
  filteredEvents: EventLog[] = [];
  pagedEvents: EventLog[] = [];
  typeFilter = '';
  dateFrom: string | null = null;
  dateTo: string | null = null;

  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;

  constructor(private eventLogService: EventLogService) {}

  ngOnInit(): void {
    this.events = this.eventLogService.getEvents();
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredEvents = this.events.filter(event => {
      const matchesType = this.typeFilter ? event.type === this.typeFilter : true;
      const matchesDateFrom = this.dateFrom ? new Date(event.date) >= new Date(this.dateFrom) : true;
      const matchesDateTo = this.dateTo ? new Date(event.date) <= new Date(this.dateTo) : true;
      return matchesType && matchesDateFrom && matchesDateTo;
    });
    this.currentPage = 1; // Reiniciar a la primera página
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredEvents.length / this.itemsPerPage);
    this.pagedEvents = this.filteredEvents.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}
