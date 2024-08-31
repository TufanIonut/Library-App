import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
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

  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email: any;
  password: any;
  confirmPassword: any;
  successMessage: string | null = null;
  constructor(private router: Router) { }
  register() {
    if (this.email && this.password && this.confirmPassword && this.password === this.confirmPassword) {
      const payload = {
        email: this.email,
        password: this.password
      };
      this.successMessage = 'Registration successful!';
      setTimeout(() => {
        this.successMessage = null;
      }, 3000);
      this.router.navigate(['/auth/login']);
    } else {
      this.successMessage = 'User Already Registred!';
      setTimeout(() => {
        this.successMessage = null;
      }, 3000);
    }
  }

}
