import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  private accountService = inject(AccountService);
  private router = inject(Router)
  private toast = inject(ToastService);
  protected creds: any = {}
  protected loggedIn = signal(true)

  login() {
    // this.accountService.login(this.creds).subscribe({
    //   next: result => {
    //     console.log(result);
    //     this.loggedIn.set(true);
    //     this.router.navigate(['/clients']);
    //     this.creds = {};
    //   },
    //   error: error => alert(error.message)
    // })
    this.loggedIn.set(true)
    this.toast.success("Success")
  }

  logout() {
    this.loggedIn.set(false);
    this.router.navigate(['/']);
  }
}
