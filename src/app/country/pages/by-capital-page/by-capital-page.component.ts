import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryService } from '../../services/country.service';

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

  handleOnSearch(query:string){
    this.countryService.searchByCapital(query).subscribe( resp => {
      console.log({resp})
    })
  }

}
