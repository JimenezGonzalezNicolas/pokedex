import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemonList(limit: number, offset: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?limit=${limit}&offset=${offset}`);
  }

  getPokemonByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${name}`);
  }
}
