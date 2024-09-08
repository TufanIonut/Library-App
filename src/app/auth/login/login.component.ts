import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { AppServiceService } from '../../../_core/app-service.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    PanelModule,
    InputTextModule,
    FormsModule,
    FloatLabelModule,
    PasswordModule,
    CommonModule,
    ToastModule,
    RippleModule


  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private router: Router, private appServiceService: AppServiceService, private messageService: MessageService) {

  }
  email: any
  password: any
  login() {
    const payload = {
      email: this.email,
      password: this.password
    };
    this.appServiceService.loginUser(payload).subscribe({
      next: (response) => {
        console.log(response);
        var role = parseInt(response.role);
        localStorage.setItem('JWT', response.token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('email', response.email);
        this.showLoginSuccess();
        setTimeout(() => {
          if (role == 0) {
            this.router.navigate(['/main/admin']);
          }
          else if (role == 1) {
            this.router.navigate(['/main/utilizator']);
          }
        }, 1000);

      },
      error: (error) => {
        this.showLoginError();
        console.log(error);
      }
    });
    console.log(payload);
  }

  showLoginSuccess() {
    this.messageService.clear();
    this.messageService.add({ key: 'toast1', severity: 'success', summary: 'Success', detail: 'Login reusit' });
  }

  showLoginError() {
    this.messageService.clear();
    this.messageService.add({ key: 'toast2', severity: 'error', summary: 'Error', detail: 'Emailul sau parola invalide' });
  }
}
