import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { map, catchError, throwError, Observable, of } from 'rxjs';
import { CountryMapper } from '../mapper/country.mapper';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private readonly http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    console.log(`Emitiendo un valor ${query}`)
    return of([]);

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map(
        (items) => CountryMapper.mapRestCountryArrayToCountryArray(items)
      ),
      catchError(error=>{
        console.log('Error fetching', error)
        return throwError(()=> new Error(`No se pudo obtener países con ese query: ${query}`))
      })
    )
  }

  searchByCountry(query: string): Observable<Country[]>{
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map(
        (items) => CountryMapper.mapRestCountryArrayToCountryArray(items)
      ),
      catchError(error=>{
        console.log('Error fetching', error)
        return throwError(()=> new Error(`No se pudo obtener países con ese query: ${query}`))
      })
    )

  }

  searchCountryByAlphaCode(code: string){
    
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
    .pipe(
      map(
        (items) => CountryMapper.mapRestCountryArrayToCountryArray(items)
      ),
      map(
        Countries => Countries.at(0)
      ),
      catchError(error=>{
        console.log('Error fetching', error)
        return throwError(()=> new Error(`No se pudo obtener países con ese alpha: ${code}`))
      })
    )

  }

}
