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
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
interface City {
  name: string;
  code: string;
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
    MultiSelectModule

  ],
  templateUrl: './utilizator.component.html',
  styleUrl: './utilizator.component.scss'
})
export class UtilizatorComponent implements OnInit {
  selectedCities!: City[];
  cards: any[] = [];
  constructor(private router: Router) {
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

  cities: City[] | undefined;

  selectedCity: City | undefined;

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }
  search(event: AutoCompleteCompleteEvent) {
    this.suggestions = [...Array(10).keys()].map(item => event.query + '-' + item);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }
}
