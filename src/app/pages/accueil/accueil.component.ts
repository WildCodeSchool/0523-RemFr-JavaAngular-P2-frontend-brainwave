import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent {
  allSquares = [
    { title: 'Titre Carré 1', content: 'Contenu Carré 1' },
    { title: 'Titre Carré 2', content: 'Contenu Carré 2' },
    { title: 'Titre Carré 3', content: 'Contenu Carré 3' },
    { title: 'Titre Carré 4', content: 'Contenu Carré 4' },
    { title: 'Titre Carré 5', content: 'Contenu Carré 5' },
    { title: 'Titre Carré 6', content: 'Contenu Carré 6' },
  ];

  filteredSquares: { title: string; content: string }[];

  constructor() {
    this.filteredSquares = [...this.allSquares];
  }

  filterSquares(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    if (searchTerm.trim() === '') {
      this.filteredSquares = [...this.allSquares];
    } else {
      this.filteredSquares = this.allSquares.filter((square) =>
        square.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
}
