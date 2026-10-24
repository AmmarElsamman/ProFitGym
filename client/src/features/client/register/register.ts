import { Component, inject, input, output } from '@angular/core';
import { Client, ClientRegisterInfo } from '../../../types/client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../../core/services/client-service';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private clientService = inject(ClientService);
  private router = inject(Router);
  private toast = inject(ToastService);
  cancelRegister = output<boolean>();
  protected clientInfo = {} as ClientRegisterInfo;

  register() {
    this.clientService.addNewClient(this.clientInfo).subscribe({
      next: response => {
        this.toast.success("Registration Successful - " + response.fullName + " Added");
        this.router.navigate(['/clients/' + response.id])
      },
      error: error => this.toast.error("Registration Failed ")
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
