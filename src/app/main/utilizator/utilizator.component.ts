import { Component, OnInit } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputOtpModule } from 'primeng/inputotp';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { AppServiceService } from '../../../_core/app-service.service';
import { Nationalitaty } from '../../../Models/Nationality';

import { SelectButtonModule } from 'primeng/selectbutton';
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-utilizator',
  standalone: true,
  imports: [
    AutoCompleteModule,
    FormsModule,
    DropdownModule,
    InputOtpModule,
    CardModule,
    ButtonModule,
    CommonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    MultiSelectModule,
    SelectButtonModule

  ],
  templateUrl: './utilizator.component.html',
  styleUrl: './utilizator.component.scss'
})
export class UtilizatorComponent implements OnInit {
  selectedNationalitati!: Nationalitaty[];
  cards: any[] = [];
  constructor(private router: Router, private service: AppServiceService) {
    this.cards = [
      {
        header: 'Card 1',
        subheader: 'First Card Subheader',
        imageSrc: 'assets/book.jpeg',
        content: 'Brief content for Card 1.'
      },
      {
        header: 'Card 2',
        subheader: 'Second Card Subheader',
        imageSrc: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
        content: 'Short description for Card 2.'
      },
      {
        header: 'Card 3',
        subheader: 'Third Card Subheader',
        imageSrc: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
        content: 'Quick info for Card 3.'
      },
      {
        header: 'Card 4',
        subheader: 'Fourth Card Subheader',
        imageSrc: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
        content: 'Concise details for Card 4.'
      },
      {
        header: 'Card 5',
        subheader: 'Fifth Card Subheader',
        imageSrc: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
        content: 'Summary text for Card 5.'
      },
      {
        header: 'Card 6',
        subheader: 'Sixth Card Subheader',
        imageSrc: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
        content: 'Compact content for Card 6.'
      },
      {
        header: 'Card 6',
        subheader: 'Sixth Card Subheader',
        imageSrc: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
        content: 'Compact content for Card 6.'
      },
      {
        header: 'Card 6',
        subheader: 'Sixth Card Subheader',
        imageSrc: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
        content: 'Compact content for Card 6.'
      }
    ];
  }
  CodeValue: any;
  items: any[] | undefined;

  selectedItem: any;

  suggestions: any[] | undefined;

  nationalitati: Nationalitaty[] | undefined;

  selectedNationalitate: Nationalitaty | undefined;
  stateOptions: any[] = [{ label: 'One-Way', value: 'one-way' }, { label: 'Return', value: 'return' }];

  value: string = 'off';
  ngOnInit() {

    this.service.getNationalities().subscribe({
      next: (response) => {

        this.nationalitati = response;
        console.log(this.nationalitati);
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.service.getBooks().subscribe((data: any) => {
      this.cards = data.map((book: any) => {
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

  search(event: AutoCompleteCompleteEvent) {
    this.suggestions = [...Array(10).keys()].map(item => event.query + '-' + item);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }
}
