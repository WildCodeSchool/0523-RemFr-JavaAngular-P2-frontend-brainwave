import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Promotion } from 'src/models/Promotion';

@Injectable({
  providedIn: 'root',
})
export class PromotionsService {
  private promoDataUrl = 'http://localhost:8080/promotions';
  constructor(private httpClient: HttpClient) {}

  // insertPromotion(data: any) {
  //   const url = 'http://localhost:8080/promotions';
  //   return this.http.post(url, data);
  // }
  getPromotions(): Observable<object> {
    return this.httpClient.get(this.promoDataUrl);
  }
  insertPromotion(data: any) {
    return this.httpClient.post(this.promoDataUrl, data);
  }
  getPromoById(promoId: string): Observable<Promotion | undefined> {
    return this.httpClient
      .get<Promotion[]>(this.promoDataUrl)
      .pipe(map((promotions: Promotion[]) => promotions.find((promo: Promotion) => promo.id === promoId)));
  }
}
