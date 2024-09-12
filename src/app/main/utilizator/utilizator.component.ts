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
import { SidebarModule } from 'primeng/sidebar';
import { Book } from '../../../Models/Book';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { Author } from '../../../Models/Author';

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
    SelectButtonModule,
    SidebarModule,
    ToastModule,
    RippleModule

  ],
  providers: [MessageService],
  templateUrl: './utilizator.component.html',
  styleUrls: ['./utilizator.component.scss']
})
export class UtilizatorComponent implements OnInit {
  sidebarVisible: boolean = false;
  favoriteBooks: Book[] | undefined;
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
  checkAdmin = false;
  favoritecards: any[] = [];
  Authors: Author[] | undefined;
  author: Author = {
    idAutor: 0,
    NumeAutor: '',
    PrenumeAutor: '',
    Nationalitate: '',
    codNationalitate: ''
  };

  constructor(private router: Router, private service: AppServiceService, private messageService: MessageService) { }
  email: any;
  ngOnInit() {
    this.items = [
      { label: 'Autori', icon: 'pi pi-pen-to-square' },
      { label: 'Carti', icon: 'pi pi-book' },
      { label: 'Utilizator', icon: 'pi pi-users' },
    ];
    this.email = localStorage.getItem("email");
    this.service.checkAdmin(this.email).subscribe({
      next: (response) => {
        if (response == 1) {
          this.checkAdmin = true;
          console.log(this.checkAdmin)
        }
        else {
          this.checkAdmin = false;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
    this.getAuthors();
    this.getBookCards();
    this.service.getNationalities().subscribe({
      next: (response) => {
        this.nationalitati = response;
        console.log(this.nationalitati);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  getAuthors() {
    this.service.getAuthors().subscribe({
      next: (response) => {
        this.Authors = response;
        console.log(this.Authors)
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  getBookCards() {
    this.service.getBooks(this.email).subscribe((data: any) => {
      this.cards = data.map((book: any) => {
        return {
          header: book.titlu,
          subheader: `Authors: ${book.authors}`,
          footer: `ISBN: ${book.isbn}`,
          isFavorite: book.isFavorite,
          idCarte: book.idCarte,
          nationalitati: book.nationalities,
          imageSrc: 'assets/book.jpeg',
        };
      });
      this.favoritecards = this.cards.filter((card: any) => card.isFavorite == 1);
      console.log(this.favoritecards)
      this.filteredCards = [...this.cards];
      console.log(data);
    });
  }
  filterBooks() {
    this.filteredCards = this.cards.filter(card => {
      const matchesTitle = card.header.toLowerCase().includes(this.searchTitle.toLowerCase());
      const matchesAuthor = card.subheader.toLowerCase().includes(this.searchAuthor.toLowerCase());
      const matchesISBN = card.footer.includes(`ISBN: ${this.searchISBN}`);
      const cardNationalities: string[] = card.nationalitati ? card.nationalitati.split(',').map((nat: any) => nat.trim()) : [];
      const selectedNationalitiesSet: Set<string> = new Set((this.selectedNationalitati || []).map(nat => nat.numeNationalitate));
      const hasSelectedNationalities = this.selectedNationalitati && this.selectedNationalitati.length > 0;
      const matchesNationalitati = !hasSelectedNationalities || cardNationalities.some(nat => selectedNationalitiesSet.has(nat));
      return matchesTitle && matchesAuthor && matchesISBN && matchesNationalitati;
    });
  }

  BecomeAdmin() {
    const payload = {
      from: localStorage.getItem("email"),
      subject: "Administrator rights request",
      body: `The user with email: ${localStorage.getItem("email")} would like to request administrator rights`
    };
    this.service.sendMail(payload).subscribe({
      next: (response) => {
        console.log(response);
        this.sendMailSuccess();
        window.location.reload()
      },
      error: (error) => {
        console.log(error);
        this.sendMailError();
      }
    });
  }

  addBookToFavorite(IdBook: any) {
    const payload = {
      email: localStorage.getItem("email"),
      idCarte: IdBook
    };
    console.log(payload)
    this.service.addBooktoFavorites(payload).subscribe({
      next: (response) => {
        console.log(response);
        this.showFavoriteSuccess();
        this.getBookCards();
      },
      error: (error) => {
        console.log(error);
        this.showFavoriteError();
      }
    });
  }
  deleteFavoriteBook(IdBook: any) {
    const payload = {
      email: localStorage.getItem("email"),
      idCarte: IdBook
    }
    this.service.deleteFavoriteBook(payload).subscribe({
      next: (response) => {
        console.log(response);
        this.showDeleteFavoriteSuccess();
        this.getBookCards();
      },
      error: (error) => {
        console.log(error);
        this.showDeleteFavoriteError();
      }

    });
  }
  showFavoriteSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Carte adaugata la favorite' });
  }
  showFavoriteError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Cartea se afla deja in sectiunea de favorite' });
  }
  showDeleteFavoriteSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Carte stearsa din favorite' });
  }
  showDeleteFavoriteError() {
    this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Eroare la stergerea cartii favorite' });
  }

  sendMailSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Email trimis cu success' });
  }
  sendMailError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Eroare la trimiterea email-ului' });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }
}
