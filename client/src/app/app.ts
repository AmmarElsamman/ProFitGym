import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from '../layout/nav/nav';
import { Home } from "../features/home/home";
import { Client } from '../types/client';

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient)
  private baseApiUrl = 'https://localhost:5001/api';
  protected clients = signal<Client[]>([]);
  protected title = 'Pro Fit Gym';

  today = new Date();

  async ngOnInit() {
    this.clients.set(await this.getClients());
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
