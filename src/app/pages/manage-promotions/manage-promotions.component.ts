import { Component, OnInit } from '@angular/core';

import { PromotionsService } from 'src/app/services/promotions.services';

@Component({
  selector: 'app-manage-promotions',
  templateUrl: './manage-promotions.component.html',
  styleUrls: ['./manage-promotions.component.scss'],
})
export class ManagePromotionsComponent implements OnInit {
  promotionsData: any;
  constructor(private promotionService: PromotionsService) {}
  getPromotionsData(): void {
    this.promotionService.getPromotions().subscribe((data: any) => {
      this.promotionsData = data;
    });
  }
  getMediaUrlFromDescription(description: string): string | null {
    const parser = new DOMParser();
    const doc = parser.parseFromString(description, 'text/html');
    const imgElement = doc.querySelector('img');

    if (imgElement) {
      return imgElement.getAttribute('src');
    }

    return null;
  }
  removeMediaFromDescription(description: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(description, 'text/html');
    const imgElement = doc.querySelector('img');

    if (imgElement) {
      imgElement.remove();
    }

    return doc.documentElement.innerHTML;
  }
  ngOnInit(): void {
    this.getPromotionsData();
  }
}
