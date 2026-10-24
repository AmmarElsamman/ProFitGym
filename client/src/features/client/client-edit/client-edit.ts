import { Component, inject, OnInit, signal, viewChild, ViewChild } from '@angular/core';
import { ClientService } from '../../../core/services/client-service';
import { Client, EditableClientInfo } from '../../../types/client';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast-service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-client-edit',
  imports: [FormsModule],
  templateUrl: './client-edit.html',
  styleUrl: './client-edit.css',
})
export class ClientEdit implements OnInit {
  @ViewChild('editForm') editForm?: NgForm;
  protected clientService = inject(ClientService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toast = inject(ToastService);
  protected client = signal<Client | undefined>(undefined);
  protected editableClient: EditableClientInfo = {
    fullName: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    status: 1,
    subscriptionDate: "",
    expirationDate: "",
  }


  constructor() {

  }

  ngOnInit(): void {
    this.route.parent?.data.subscribe(data => {
      this.client.set(data['client']);
    })

    this.editableClient = {
      fullName: this.client()?.fullName || '',
      dateOfBirth: this.client()?.dateOfBirth || '',
      email: this.client()?.email || '',
      phoneNumber: this.client()?.phoneNumber || '',
      status: this.client()?.status || 1,
      subscriptionDate: this.client()?.subscriptionDate || '',
      expirationDate: this.client()?.expirationDate || '',
    }

  }

  updateClientInfo(): void {
    if (!this.client) return;
    const updatedInfo = { ...this.client(), ...this.editableClient }
    this.clientService.updateClient(this.client()?.id || '', updatedInfo).subscribe({
      next: () => {
        this.toast.success("Profile Updated Successfully");
        this.client.set(updatedInfo as Client);
        this.editForm?.reset(updatedInfo);
        this.clientService.editMode.set(false);
        this.router.navigateByUrl('/clients/' + this.client()?.id);
      }
    })

  }


}
