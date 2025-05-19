import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { map, catchError, throwError, Observable, of, tap } from 'rxjs';

import { CountryMapper } from '../mapper/country.mapper';
import type { RESTCountry } from '../interfaces/rest-countries.interface';
import type { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private readonly http = inject(HttpClient);
  private readonly queryCacheCapital = new Map<string, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCapital.has('query')) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map(
          (items) => CountryMapper.mapRestCountryArrayToCountryArray(items)
        ),
        tap( countries => this.queryCacheCapital.set(query,countries) ),
        catchError(error => {
          console.log('Error fetching', error)
          return throwError(() => new Error(`No se pudo obtener países con ese query: ${query}`))
        })
      )
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map(
          (items) => CountryMapper.mapRestCountryArrayToCountryArray(items)
        ),
        catchError(error => {
          console.log('Error fetching', error)
          return throwError(() => new Error(`No se pudo obtener países con ese query: ${query}`))
        })
      )

  }

  searchCountryByAlphaCode(code: string) {

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
      .pipe(
        map(
          (items) => CountryMapper.mapRestCountryArrayToCountryArray(items)
        ),
        map(
          Countries => Countries.at(0)
        ),
        catchError(error => {
          console.log('Error fetching', error)
          return throwError(() => new Error(`No se pudo obtener países con ese alpha: ${code}`))
        })
      )

  }

}
