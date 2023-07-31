import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-user-promotions',
    templateUrl: './user-promotions.component.html',
    styleUrls: ['./user-promotions.component.scss'],
})
export class UserPromotionsComponent {
    @Input() promotions: any = [];
}
