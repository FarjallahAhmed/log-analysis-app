import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent {
  embeddableUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    const embedUrl = "http://localhost:5601/app/dashboards#/view/dff98880-bdbb-11ed-a8ff-ddcc15b4a7b1?embed=true&_g=(refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))&_a=(viewMode:edit)&show-top-menu=true&show-query-input=true&show-time-filter=true";
    const embedUrl2 = "http://localhost:5601/app/discover#/?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))&_a=(columns:!(),filters:!(),index:'6111340f-cdce-43ef-8187-d3cbe342c325',interval:auto,query:(language:kuery,query:''),sort:!())";
    this.embeddableUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl2);
  }
}
