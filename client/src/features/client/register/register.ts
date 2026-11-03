import { DatePipe } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientRegisterInfo } from '../../../types/client';
import { ClientService } from '../../../core/services/client-service';
import { ToastService } from '../../../core/services/toast-service';
import { toDateInput } from '../../../core/utils/date-utils';

@Component({
  selector: 'app-register',
  imports: [FormsModule, DatePipe],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private clientService = inject(ClientService);
  private router = inject(Router);
  private toast = inject(ToastService);
  cancelRegister = output<boolean>();

  protected durations = [1, 3, 6, 12];
  protected clientInfo: ClientRegisterInfo = {
    fullName: '',
    email: '',
    dateOfBirth: '',
    phoneNumber: '',
    subscriptionDate: toDateInput(new Date()),
    membershipDurationInMonths: 1,
  };

  // Preview of the expiry date, so staff can check it before saving
  protected get expiresOn(): Date | null {
    const { subscriptionDate, membershipDurationInMonths } = this.clientInfo;
    if (!subscriptionDate || !membershipDurationInMonths) return null;

    const d = new Date(subscriptionDate + 'T00:00:00');
    const day = d.getDate();
    d.setDate(1);
    d.setMonth(d.getMonth() + Number(membershipDurationInMonths));
    const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    d.setDate(Math.min(day, lastDay)); // Jan 31 + 1 month = Feb 28, like the server
    return d;
  }

  register() {
    this.clientService.addNewClient(this.clientInfo).subscribe({
      next: response => {
        this.toast.success("Registration Successful - " + response.fullName + " Added");
        this.router.navigate(['/clients/' + response.id]);
      },
      error: error => this.toast.error("Registration Failed ")
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}