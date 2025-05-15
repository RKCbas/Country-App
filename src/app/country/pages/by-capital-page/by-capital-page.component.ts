import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { SearchInputComponent } from "../../components/search-input/search-input.component";

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


  handleOnSearch(value:string){
    console.log({value})
  }

}
