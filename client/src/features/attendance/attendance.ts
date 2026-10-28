import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccessService } from '../../core/services/access-service';
import { AttendanceEntry } from '../../types/access';

@Component({
  selector: 'app-attendance',
  imports: [FormsModule, DatePipe],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css',
})
export class Attendance {
  private accessService = inject(AccessService);

  protected entries = signal<AttendanceEntry[]>([]);
  protected allowedCount = computed(() => this.entries().filter(e => e.allowed).length);
  protected deniedCount = computed(() => this.entries().filter(e => !e.allowed).length);
  protected date = new Date().toLocaleDateString('en-CA', { timeZone: 'Africa/Cairo' }); // yyyy-MM-dd

  constructor() {
    this.load();
  }

  protected load() {
    this.accessService.getAttendance(this.date).subscribe({
      next: list => this.entries.set(list),
    });
  }
}
