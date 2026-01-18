import { Component, inject, input, output } from '@angular/core';
import { Client, ClientRegisterInfo } from '../../../types/client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../../core/services/client-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private clientService = inject(ClientService);
  cancelRegister = output<boolean>();
  protected clientInfo = {} as ClientRegisterInfo;

  register() {
    this.clientService.addNewClient(this.clientInfo).subscribe({
      next: response => {
        console.log('Registration Successful', response)
        this.cancel();
      },
      error: error => console.log('Registration Failed', error)
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
