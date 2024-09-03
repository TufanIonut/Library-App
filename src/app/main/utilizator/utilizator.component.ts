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
  styleUrls: ['./utilizator.component.scss']
})
export class UtilizatorComponent implements OnInit {
  selectedNationalitati!: Nationalitaty[];
  cards: any[] = [];
  filteredCards: any[] = [];
  searchTitle: string = '';
  searchAuthor: string = '';
  searchISBN: string = '';
  CodeValue: any;
  items: any[] | undefined;
  selectedItem: any;
  suggestions: any[] | undefined;
  nationalitati: Nationalitaty[] | undefined;
  selectedNationalitate: Nationalitaty | undefined;
  value: string = 'off';

  constructor(private router: Router, private service: AppServiceService) { }

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
      this.filteredCards = [...this.cards];
      console.log(data);
    });
  }
  filterBooks() {
    this.filteredCards = this.cards.filter(card => {
      const matchesTitle = card.header.toLowerCase().includes(this.searchTitle.toLowerCase());
      const matchesAuthor = card.subheader.toLowerCase().includes(this.searchAuthor.toLowerCase());
      const matchesISBN = card.footer.includes(`ISBN: ${this.searchISBN}`);
      return matchesTitle && matchesAuthor && matchesISBN;
    });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }
}
