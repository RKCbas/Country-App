import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'country-page-component',
  imports: [],
  templateUrl: './country-page-component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CountryPageComponentComponent { }
