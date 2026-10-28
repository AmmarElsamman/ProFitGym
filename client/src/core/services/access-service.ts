import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AccessResult, AttendanceEntry } from '../../types/access';

@Injectable({ providedIn: 'root' })
export class AccessService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  validate(code: string) {
    return this.http.post<AccessResult>(this.baseUrl + 'access/validate', { clientId: code });
  }

  getAttendance(date: string) {
    return this.http.get<AttendanceEntry[]>(this.baseUrl + 'attendance', { params: { date } })
  }
}