import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Client, ClientRegisterInfo } from '../../types/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http = inject(HttpClient);
  currentUser = signal<any>(null);

  baseUrl = "https://localhost:5001/api/";

  addNewClient(clientInfo: ClientRegisterInfo) {
    return this.http.post<Client>(this.baseUrl + 'clients/register', clientInfo)
  }

}
