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
import { Author } from '../../../Models/Author';
import { AppServiceService } from '../../../_core/app-service.service';
import { AvatarModule } from 'primeng/avatar';
import { Nationalitaty } from '../../../Models/Nationality';
import { MultiSelectModule } from 'primeng/multiselect';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { FloatLabelModule } from 'primeng/floatlabel';
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
    CommonModule,
    AvatarModule,
    MultiSelectModule,
    CascadeSelectModule,
    FloatLabelModule

  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  constructor(private router: Router, private appService: AppServiceService) {
  }
  items: MenuItem[] | undefined;
  Authorcards: any[] = [];
  BookCards: any[] = [];
  activeItem: MenuItem | undefined;
  nationalitati: Nationalitaty[] | undefined;
  selectedNationalitati!: Nationalitaty[];
  selectedNationalitate: Nationalitaty | undefined;

  countries: any[] | undefined;

  selectedCountry: any;
  ngOnInit() {
    this.items = [
      { label: 'Autori', icon: 'pi pi-pen-to-square' },
      { label: 'Carti', icon: 'pi pi-book' },
      { label: 'Utilizator', icon: 'pi pi-users' },

    ];
    this.activeItem = this.items[0];
    console.log(this.items);

    this.appService.getNationalities().subscribe({
      next: (response) => {
        this.countries = response;
        console.log(this.countries);
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.appService.getAuthors().subscribe((data: any) => {
      this.Authorcards = data.map((author: any) => {
        return {
          header: author.fullName,
          subheader: `Nationalitate: ${author.numeNationalitate}`,
          imageSrc: 'assets/cat.jpeg',
        };
      });
      console.log(data);
    });

    this.appService.getBooks().subscribe((data: any) => {
      this.BookCards = data.map((book: any) => {
        return {
          header: book.titlu,
          subheader: `Authors: ${book.authors}`,
          footer: `ISBN: ${book.isbn}`,
          imageSrc: 'assets/book.jpeg',
        };
      });
      console.log(data);
    });
  }

  author: Author = {
    NumeAutor: '',
    PrenumeAutor: '',
    Nationalitate: ''
  };
  nationalities = [
    { label: 'Română', value: 'RO' },
    { label: 'Engleză', value: 'EN' },
    { label: 'Franceză', value: 'FR' }
  ];
  books = {

  }

  visibleAutor: boolean = false;
  visibleBook: boolean = false;
  showDialogAutor() {
    this.visibleAutor = true;
  }
  showDialogBook() {
    this.visibleBook = true;
  }
  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
    console.log('Active item changed to:', this.activeItem);

    if (this.activeItem.label === 'Utilizator') {
      this.router.navigate(['/main/utilizator']);
    }
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }



  authors = {
    Nationalitate: [] as string[]
  };


  onCheckboxChange(event: any) {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      this.authors.Nationalitate.push(value);
    } else {
      this.authors.Nationalitate = this.authors.Nationalitate.filter(val => val !== value);
    }
  }
}
