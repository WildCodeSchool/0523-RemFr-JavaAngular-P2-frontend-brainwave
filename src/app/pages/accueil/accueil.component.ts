import { Component, OnInit } from '@angular/core';
import { Promotion } from 'src/models/Promotion';
import { PromotionsService } from 'src/app/services/promotions.services';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent implements OnInit {
  filteredPromotions: Promotion[] = [];
  allPromotions: Promotion[] = [];

  constructor(private promotionsService: PromotionsService) {}

  ngOnInit(): void {
    this.promotionsService.getPromotions().subscribe(
      (response: any) => {
        console.log(response);
        this.allPromotions = response as Promotion[];
        this.filteredPromotions = [...this.allPromotions];
      },
      (error) => {
        console.error('Failed to fetch promotions', error);
      }
    );
  }

  filterPromotions(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    if (searchTerm.trim() === '') {
      this.filteredPromotions = [...this.allPromotions];
    } else {
      this.filteredPromotions = this.allPromotions.filter((promo) =>
        promo.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
}
