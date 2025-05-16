import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryService } from '../../services/country.service';
// import { Country } from '../../interfaces/country.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'by-capital-page',
  imports: [
    CountryListComponent, 
    SearchInputComponent
  ],
  templateUrl: './by-capital-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ByCapitalPageComponent {

  countryService = inject(CountryService)
  query = signal('');

  countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async({ request }) => {

      if(!this.query()) return [];

      return await firstValueFrom(
        this.countryService.searchByCapital(request.query)
      )

    }
  });

  // isLoading = signal(false);
  // isError = signal<string|null>(null);
  // countries = signal<Country[]>([]);

  // handleOnSearch(query:string){
    
  //   if(this.isLoading() )return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(query)
  //   .subscribe({
  //     next: (countries) => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);
  //     },
  //     error: (err) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(err);
  //     },
  //   });

  // }

}
