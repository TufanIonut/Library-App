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
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
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
    FloatLabelModule,
    ToastModule,
    RippleModule

  ],
  providers: [MessageService],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  constructor(private router: Router, private appService: AppServiceService, private messageService: MessageService) {
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
    if (this.selectedAuthors == undefined || this.TitluTxt == undefined) {
      this.addBookErrorBadRequest();
    }
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
          this.addBookSuccess();
          this.getBooks();
          console.log(response);
        },

        error: (error) => {
          this.addBookError();
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
    if (this.NumeAutorTxt == undefined && this.PrenumeAutorTxt == undefined) {
      this.addAuthorsBadRequest();
    } else if (this.selectedNationalitate == undefined) {
      this.addAuthorsBadRequestNationalitate();
    } else {
      this.appService.addAuthor(payload).subscribe({
        next: (response) => {
          this.addAuthorSuccess();
          this.getAuthorsForCards();
          console.log(response);
        },
        error: (error) => {
          this.addAuthorError();
          console.log(error);
        }
      });
    }

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
  email = localStorage.getItem("email");
  getBooks() {

    this.appService.getBooks(this.email).subscribe((data: any) => {
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

  logout() {
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }

  //--------------------------------------------------Meesssageeeeessss
  addAuthorSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Autor adaugat cu success' });
  }
  addAuthorError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Autor deja existent' });
  }
  addBookSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Carte adaugata cu success' });
  }
  addBookError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Carte deja existenta' });
  }
  addBookErrorBadRequest() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Titlul si autorii trebuie completate' });
  }
  addAuthorsBadRequest() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Numele si Prenumele trebuie completate' });
  }
  addAuthorsBadRequestNationalitate() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Alegeti nationalitatea' });
  }
}
