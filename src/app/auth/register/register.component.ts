import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppServiceService } from '../../../_core/app-service.service';

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
  constructor(private router: Router, private service: AppServiceService) { }
  register() {
    if (this.email && this.password && this.confirmPassword && this.password === this.confirmPassword) {
      const payload = {
        email: this.email,
        password: this.password
      };
      this.service.register(payload).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      })
      this.router.navigate(['/auth/login']);
    } else {

    }
  }

}
