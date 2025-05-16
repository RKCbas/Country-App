import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'by-country-page',
  imports: [
    CountryListComponent, 
    SearchInputComponent
  ],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ByCountryPageComponent { 
  
  countryService = inject(CountryService);
  query = signal('');

  countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async({ request }) => {

      if(!this.query()) return [];

      return await firstValueFrom(
        this.countryService.searchByCountry(request.query)
      )

    }
  });


}
