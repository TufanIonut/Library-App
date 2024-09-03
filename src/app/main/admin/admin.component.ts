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
  BookCards: any[] = [];
  TitluTxt: any;
  activeItem: MenuItem | undefined;
  nationalitati: Nationalitaty[] | undefined;
  selectedNationalitate: Nationalitaty | undefined;
  isbn: number | undefined;
  Authorcards: any[] = [];
  Authors: Author[] | undefined;
  selectedAuthors: Author[] | undefined;
  NumeAutorTxt: any;
  PrenumeAutorTxt: any;
  ngOnInit() {
    this.checkAdmin();
    this.items = [
      { label: 'Autori', icon: 'pi pi-pen-to-square' },
      { label: 'Carti', icon: 'pi pi-book' },
      { label: 'Utilizator', icon: 'pi pi-users' },
    ];
    this.activeItem = this.items[0];
    this.getNationalities();
    this.getAuthorsForCards();
    this.getAuthors();
    this.getBooks();
  }
  author: Author = {
    idAutor: 0,
    NumeAutor: '',
    PrenumeAutor: '',
    Nationalitate: '',
    codNationalitate: ''
  };

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
    if (this.activeItem.label === 'Utilizator') {
      this.router.navigate(['/main/utilizator']);
    }
  }
  //---------------------------------ADD BOOK
  AddBook() {
    console.log(this.selectedAuthors);
    this.visibleBook = false;
    if (this.selectedAuthors && this.selectedAuthors.length > 0) {
      const firstAuthorNationalityCode = String(this.selectedAuthors[0].codNationalitate);
      let idArray: number[] = [];

      this.selectedAuthors.forEach(author => {
        idArray.push(author.idAutor);
      });
      const authorIds = idArray.join(';');

      const payload = {
        authorCode: firstAuthorNationalityCode,
        titlu: this.TitluTxt,
        idAuthors: authorIds
      };
      console.log(payload);
      this.appService.addBook(payload).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  //---------------------------------ADD AUTHOR
  AddAuthor() {
    this.visibleAutor = false;
    const payload = {
      nume: this.NumeAutorTxt,
      prenume: this.PrenumeAutorTxt,
      idNationalitate: this.selectedNationalitate?.idNationalitate
    };
    this.appService.addAuthor(payload).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });

    console.log(payload);
  }
  //------------------------------------------------------
  //-------------------------------------GETs-------------
  getNationalities() {
    this.appService.getNationalities().subscribe({
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
    this.appService.getAuthors().subscribe({
      next: (response) => {
        this.Authors = response;
        console.log(this.Authors);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  getAuthorsForCards() {
    this.appService.getAuthors().subscribe((data: any) => {
      this.Authorcards = data.map((author: any) => {
        return {
          header: author.fullName,
          subheader: `Nationalitate: ${author.numeNationalitate}`,
          imageSrc: 'assets/cat.jpeg',
        };
      });
    });
  }
  getBooks() {
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
  //---------------------------------------------------------
  checkAdmin() {
    this.appService.checkAdmin().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }
}
