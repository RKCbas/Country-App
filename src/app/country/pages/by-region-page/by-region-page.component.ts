import { ChangeDetectionStrategy, Component, inject, linkedSignal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import type { Region } from '../../interfaces/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLowerCase();

  const validRegions: Record<string, Region> = {
    'africa': 'Africa',
    'americas': 'Americas',
    'antarctic': 'Antarctic',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
  };
  
  return validRegions[queryParam] ?? 'Americas';

}

@Component({
  selector: 'by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ByRegionPageComponent {

  countryService = inject(CountryService);

  router = inject(Router);

  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Antarctic',
    'Asia',
    'Europe',
    'Oceania',
  ];

  selectedRegion = linkedSignal<Region | null>(() => validateQueryParam(this.queryParam))

  countryResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => {

      if (!request.region) return of([]);

      this.router.navigate(['country/by-region'], {
        queryParams: { region: request.region }
      });

      return this.countryService.searchByRegion(request.region)

    }
  });

}
