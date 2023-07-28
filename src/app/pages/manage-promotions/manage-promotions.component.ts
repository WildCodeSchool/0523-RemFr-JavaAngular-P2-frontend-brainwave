import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { PromotionsService } from 'src/app/services/promotions.services';
import { UserService } from 'src/app/services/user.service';

type Participant = {
  firstname: string;
  lastname: string;
};

@Component({
  selector: 'app-manage-promotions',
  templateUrl: './manage-promotions.component.html',
  styleUrls: ['./manage-promotions.component.scss'],
  providers: [DatePipe],
  animations: [trigger('fadeInOut', [state('void', style({ opacity: 0 })), transition('void <=> *', animate(500))])],
})
export class ManagePromotionsComponent implements OnInit {
  authorId: any;
  authorName!: string;
  promotionsData: any;
  promoId: any;
  selectedPromotionId: any;
  participantsMap: { [promotionId: string]: string[] } = {};

  constructor(
    private promotionsService: PromotionsService,
    private userService: UserService,
    private datePipe: DatePipe
  ) {}
  formatDate(date: string | null): string {
    if (date === null) {
      return '';
    }
    return this.datePipe.transform(date, 'dd MMMM yyyy') || '';
  }

  getPromotionsData(): void {
    this.promotionsService.getPromotions().subscribe((data: any) => {
      this.promotionsData = data;
      this.participantsMap = {};
      this.promotionsData.forEach((promotion: any) => {
        const participantIds: string[] = promotion.participantsIds;
        this.participantsMap[promotion.id] = [];
        participantIds.forEach((participantId: string) => {
          this.promotionsService.getParticipantName(participantId).subscribe((participant: Participant) => {
            const fullName = `${participant.firstname} ${participant.lastname}`;
            this.userService.getUserById(promotion.authorId).subscribe((user: any) => {
              this.authorName = `${user.firstname} ${user.lastname}`;
            });
            this.participantsMap[promotion.id].push(fullName);
          });
        });
      });
    });
  }

  selectPromotionById(promoId: string): void {
    this.selectedPromotionId = promoId;
  }
  getResourceLinkAndTitle(resourceId: string): Observable<string> {
    return this.promotionsService
      .getResourceById(resourceId)
      .pipe(map((resource: any) => `${resource.link} ${resource.title}`));
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
