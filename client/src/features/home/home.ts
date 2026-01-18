import { HttpClient } from '@angular/common/http';
import { Component, Input, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Client } from '../../types/client';
import { DatePipe } from '@angular/common';
import { Register } from "../client/register/register";

@Component({
  selector: 'app-home',
  imports: [DatePipe, Register],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  @Input({ required: true }) clientsFromApp: Client[] = [];
  protected registerMode = signal(false);

  showRegister(value: boolean) {
    this.registerMode.set(value);
  }

  isExpiringToday(expirationDate: string): boolean {
    const expDate = new Date(expirationDate).toDateString();
    const todayStr = new Date().toDateString();
    return expDate === todayStr;
  }

}
