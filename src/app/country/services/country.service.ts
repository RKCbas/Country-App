import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { map, catchError, throwError, Observable, of, tap } from 'rxjs';

import { CountryMapper } from '../mapper/country.mapper';
import type { RESTCountry } from '../interfaces/rest-countries.interface';
import type { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private readonly http = inject(HttpClient);

  private readonly queryCacheCapital = new Map<string, Country[]>();
  private readonly queryCachePaís = new Map<string, Country[]>();
  private readonly queryCacheRegion = new Map<Region, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map(
          (items) => CountryMapper.mapRestCountryArrayToCountryArray(items)
        ),
        tap(countries => this.queryCacheCapital.set(query, countries)),
        catchError(error => {
          console.log('Error fetching', error)
          return throwError(() => new Error(`No se pudo obtener países con ese query: ${query}`))
        })
      )
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCachePaís.has(query)) {
      return of(this.queryCachePaís.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map(
          (items) => CountryMapper.mapRestCountryArrayToCountryArray(items)
        ),
        tap(countries => this.queryCachePaís.set(query, countries)),
        catchError(error => {
          console.log('Error fetching', error)
          return throwError(() => new Error(`No se pudo obtener países con ese query: ${query}`))
        })
      )

  }

  searchByRegion(region: Region) {

    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`)
      .pipe(
        map(
          (items) => CountryMapper.mapRestCountryArrayToCountryArray(items)
        ),
        tap(countries => this.queryCacheRegion.set(region, countries)),
        catchError(error => {
          console.log('Error fetching', error)
          return throwError(() => new Error(`No se pudo obtener países con esa region: ${region}`))
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
