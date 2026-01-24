import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from '../layout/nav/nav';
import { Home } from "../features/home/home";
import { Client } from '../types/client';
import { Router, RouterOutlet } from '@angular/router';
import { AccountService } from '../core/services/account-service';


@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private accountService = inject(AccountService);
  protected router = inject(Router);
  private http = inject(HttpClient)
  private baseApiUrl = 'https://localhost:5001/api';
  protected title = 'Pro Fit Gym';
  protected clients = signal<Client[]>([]);
  today = new Date();

  async ngOnInit() {
    this.clients.set(await this.getClients());
    this.setCurrentUser();
  }


  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  // * since we no longer using observables, we don't need to worry about subscribing and unsubscribing 
  async getClients() {
    try {
      return lastValueFrom(this.http.get<Client[]>(this.baseApiUrl + '/clients/'));
    } catch (error) {
      console.error('There was an error!', error);
      throw error;
    }
  }

}
