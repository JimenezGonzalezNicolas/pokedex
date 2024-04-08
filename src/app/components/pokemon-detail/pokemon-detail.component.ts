import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CapitalizeFirstPipe } from '../../pipes/capitalize-first.pipe';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CapitalizeFirstPipe, CommonModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
})
export class PokemonDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
