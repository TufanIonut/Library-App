import { Component, OnInit } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputOtpModule } from 'primeng/inputotp';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    AutoCompleteModule,
    FormsModule,
    DropdownModule,
    InputOtpModule,
    CardModule,
    ButtonModule,
    TabMenuModule,
    DialogModule,
    InputTextModule,
    CommonModule

  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  constructor(private router: Router) {

  }
  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Autori', icon: 'pi pi-users' },
      { label: 'Carti', icon: 'pi pi-book' },
    ];

    this.activeItem = this.items[0];
    console.log(this.items);
  }
  showModal: boolean = false;
  author = {
    firstName: '',
    lastName: '',
    nationality: ''
  };
  nationalities = [
    { label: 'Română', value: 'RO' },
    { label: 'Engleză', value: 'EN' },
    { label: 'Franceză', value: 'FR' }
  ];
  showDialog() {
    this.showModal = true;
  }
  addAuthor() {
    console.log(this.author);
    this.showModal = false;
  }
  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }
  logout() {
    this.router.navigate(['auth/login']);
  }
}
