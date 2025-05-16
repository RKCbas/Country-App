import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { map, catchError, throwError, delay } from 'rxjs';
import { CountryMapper } from '../mapper/country.mapper';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private readonly http = inject(HttpClient);

  searchByCapital(query: string) {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map(
        (items) => CountryMapper.mapRestCountryArrayToCountryArray(items)
      ),
      catchError(error=>{
        console.log('Error fetching', error)
        return throwError(()=> new Error(`No se pudo obtener países con ese query ${query}`))
      })
    )
  }

  searchByCountry(query: string){
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map(
        (items) => CountryMapper.mapRestCountryArrayToCountryArray(items)
      ),
      catchError(error=>{
        console.log('Error fetching', error)
        return throwError(()=> new Error(`No se pudo obtener países con ese query ${query}`))
      })
    )

  }

}
