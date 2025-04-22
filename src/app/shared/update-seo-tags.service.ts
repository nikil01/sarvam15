import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateSeoTagsService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  setCanonical(url: string): void {
    let link: HTMLLinkElement = this.document.querySelector("link[rel='canonical']");

    if (link) {
      link.setAttribute('href', url);
    } else {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url);
      this.document.head.appendChild(link);
    }
  }
}
