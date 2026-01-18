import { Component, input, output } from '@angular/core';
import { Client, ClientRegisterInfo } from '../../../types/client';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  clientsFromHome = input.required<Client[]>();
  cancelRegister = output<boolean>();
  protected clientInfo = {} as ClientRegisterInfo;

  register() {
    console.log(this.clientInfo);
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
