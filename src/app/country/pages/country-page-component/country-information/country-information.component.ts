import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { GoogleMapViewerComponent } from "../../../components/google-map-viewer/google-map-viewer.component";
import { UnsplashImageService } from 'src/app/country/services/Unsplash-Image.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'country-information-page',
  imports: [
    DecimalPipe,
    GoogleMapViewerComponent
  ],
  templateUrl: './country-information.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryInformationComponent {

  unsplashImageService = inject(UnsplashImageService)

  country = input.required<Country>()

  currentYear = computed(() => {
    return new Date().getFullYear();
  })

  imagesResource = rxResource({
    request: () => ({ query: this.country().name, quantity: 4 }),
    loader: ({ request }) => {
      return this.unsplashImageService.searchImages(request.query, request.quantity)
    }
  });

}
