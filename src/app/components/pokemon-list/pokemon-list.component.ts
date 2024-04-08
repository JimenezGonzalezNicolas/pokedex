import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PokedexService } from '../../env/services/pokedex.service';
import { CapitalizeFirstPipe } from '../../pipes/capitalize-first.pipe';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';

interface Pokemon {
  name: string;
  url: string;
}

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, CapitalizeFirstPipe, MatIconModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  offset = 0;
  limit = 10;
  totalPokemons = 0;
  displayPages = 5; // Número inicial de páginas a mostrar

  get totalPages(): number {
    return Math.ceil(this.totalPokemons / this.limit);
  }

  get currentPage(): number {
    return Math.floor(this.offset / this.limit) + 1;
  }

  get pageNumbers(): number[] {
    const total = this.totalPages;
    let start = Math.max(this.currentPage - 2, 1);
    let end = Math.min(start + 4, total);

    if (total >= 5 && end === total) start = end - 4;

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }

  constructor(
    private pokemonService: PokedexService,
    public dialog: MatDialog
  ) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.loadPokemon();
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    if (window.innerWidth <= 425) {
      this.displayPages = 3;
    } else {
      this.displayPages = 5;
    }
    this.calculatePageNumbers();
  }

  calculatePageNumbers() {
    const total = this.totalPages;
    let start = Math.max(
      this.currentPage - Math.floor(this.displayPages / 2),
      1
    );
    let end = Math.min(start + this.displayPages - 1, total);

    if (total >= this.displayPages && end === total)
      start = end - this.displayPages + 1;
  }

  loadPokemon(): void {
    this.pokemonService.getPokemonList(this.limit, this.offset).subscribe({
      next: (response) => {
        this.pokemonList = response.results;
        this.totalPokemons = response.count;
      },
      error: (err) => console.error(err),
    });
  }

  changePage(newOffset: number): void {
    this.offset = newOffset;
    this.loadPokemon();
  }

  openDetails(pokemon: Pokemon): void {
    this.pokemonService.getPokemonByName(pokemon.name).subscribe({
      next: (detail) => {
        this.dialog.open(PokemonDetailComponent, {
          data: { pokemon: detail },
          width: '800px',
        });
      },
      error: (err) => {
        console.error('Error al cargar los detalles del Pokémon', err);
      },
    });
  }

  goToPage(page: number): void {
    this.offset = (page - 1) * this.limit;
    this.loadPokemon();
  }
}
