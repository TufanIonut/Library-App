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

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private router: Router, private appServiceService: AppServiceService) {

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

        if (role == 0) {
          this.router.navigate(['/main/admin']);
        }
        else if (role == 1) {
          localStorage.setItem('email', response.email);
          this.router.navigate(['/main/utilizator']);
        }

      },
      error: (error) => {
        console.log(error);
      }
    });
    console.log(payload);
  }
}
