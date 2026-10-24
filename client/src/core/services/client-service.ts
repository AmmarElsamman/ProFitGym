import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Client, ClientRegisterInfo, EditableClientInfo } from '../../types/client';
import { environment } from '../../environments/environment';
import { ToastService } from './toast-service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  baseUrl = environment.apiUrl;
  protected clients = signal<Client[]>([]);
  editMode = signal(false);

  addNewClient(clientInfo: ClientRegisterInfo) {
    return this.http.post<Client>(this.baseUrl + 'clients/register', clientInfo)
  }

  getClients() {
    return this.http.get<Client[]>(this.baseUrl + 'clients');
  }

  getClientById(id: string) {
    return this.http.get<Client>(this.baseUrl + 'clients/' + id);
  }

  deleteClient(id: string) {
    return this.http.delete<void>(this.baseUrl + 'clients/' + id);
  }

  getClientQrCode(id: string) {
    return this.http.get<{ qrCode: string }>(this.baseUrl + `clients/${id}/qrcode`);
  }

  updateClient(id: string, client: EditableClientInfo) {
    return this.http.put(this.baseUrl + 'clients/' + id, client);
  }




  // * since we no longer using observables, we don't need to worry about subscribing and unsubscribing 
  // async getClients() {
  //   try {
  //     return lastValueFrom(this.http.get<Client[]>(this.baseUrl + '/clients/'));
  //   } catch (error) {
  //     this.toast.error("Cannot retrieve clients' list");
  //     throw error;
  //   }
  // }


}
