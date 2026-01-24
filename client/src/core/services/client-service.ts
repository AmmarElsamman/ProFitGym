import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Client, ClientRegisterInfo } from '../../types/client';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http = inject(HttpClient);
  currentUser = signal<any>(null);
  protected clients = signal<Client[]>([]);
  baseUrl = "https://localhost:5001/api/";

  addNewClient(clientInfo: ClientRegisterInfo) {
    return this.http.post<Client>(this.baseUrl + 'clients/register', clientInfo)
  }

  // * since we no longer using observables, we don't need to worry about subscribing and unsubscribing 
  async getClients() {
    try {
      return lastValueFrom(this.http.get<Client[]>(this.baseUrl + '/clients/'));
    } catch (error) {
      console.error('There was an error!', error);
      throw error;
    }
  }


}
