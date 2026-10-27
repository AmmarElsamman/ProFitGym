import { HttpClient } from '@angular/common/http';
import { Component, inject, Input, OnInit, Signal, signal } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { Client } from '../../types/client';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Register } from "../client/register/register";
import { AccountService } from '../../core/services/account-service';
import { ClientService } from '../../core/services/client-service';

@Component({
  selector: 'app-home',
  imports: [DatePipe, Register, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected accountService = inject(AccountService);
  private clientService = inject(ClientService);
  protected clients$: Observable<Client[]>;
  protected registerMode = signal(false);

  private cairoDay(d: Date): string {
    return d.toLocaleDateString('en-CA', { timeZone: 'Africa/Cairo' });
  }

  constructor() {
    this.clients$ = this.clientService.getClients();
  }


  showRegister(value: boolean) {
    this.registerMode.set(value);
  }

  isExpiringToday(expirationDate: string): boolean {
    return this.cairoDay(new Date(expirationDate)) === this.cairoDay(new Date());
  }

}
