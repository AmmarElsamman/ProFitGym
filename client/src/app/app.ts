import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient)
  private baseApiUrl = 'https://localhost:5001/api';
  protected title = 'Pro Fit Gym';
  protected clients = signal<any>([]);

  async ngOnInit() {
    this.clients.set(await this.getClients())
  }

  // * since we no longer using observables, we don't need to worry about subscribing and unsubscribing 
  async getClients() {
    try {
      return lastValueFrom(this.http.get(this.baseApiUrl + '/clients/'));
    } catch (error) {
      console.error('There was an error!', error);
      throw error;
    }
  }

}
