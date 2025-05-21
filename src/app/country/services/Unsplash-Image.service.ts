import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { ImageInterface } from '../interfaces/Image.interface';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import type { UnsplashSearchResponse } from '../interfaces/Unsplash-Search.interface';
import { environment } from '@environments/environment';
import { ImageMapper } from '../mapper/Image.mapper';

@Injectable({ providedIn: 'root' })
export class UnsplashImageService {

    private readonly http = inject(HttpClient);

    private readonly imagesCache = new Map<string, ImageInterface[]>();

    searchImages(queryTs: string, quantity: number): Observable<ImageInterface[]> {

        if (this.imagesCache.has(queryTs)) {
            return of(this.imagesCache.get(queryTs) ?? []);
        }

        const Url = environment.unsplashSearchUrl;
        console.log(Url)

        return this.http.get<UnsplashSearchResponse>(Url , {
            params: {
                client_id: environment.unsplashClientId,
                query: queryTs,
                per_page: quantity
            }
        }).pipe(
            map(({ results }) => results), // vamos a iterar sobre los results
            map(images => ImageMapper.mapResultsArrayToImagesArray(images)), // Los convertimos a ImagesInterfaces
            tap(images => this.imagesCache.set(queryTs, images)),
            catchError(error => {
                console.log('Error fetching', error)
                return throwError(() => new Error(`No se pudo obtener imágenes con ese query: ${queryTs}`))
            })
        )
    }

}