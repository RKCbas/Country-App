import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'google-map-viewer',
  imports: [],
  templateUrl: './google-map-viewer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoogleMapViewerComponent {
  
  location = input.required<string>()

  constructor(private readonly sanitizer:DomSanitizer){}

  mapUrl = computed<SafeResourceUrl>(() => {
    const loc = this.location();
    const url = `https://maps.google.com/maps?q=${encodeURIComponent(loc)}&t=&z=5&ie=UTF8&iwloc=&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });

}
