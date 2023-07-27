import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PromotionsService } from 'src/app/services/promotions.services';
import { UserService } from 'src/app/services/user.service';

type Participant = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
};

@Component({
  selector: 'app-update-promotion',
  templateUrl: './update-promotion.component.html',
  styleUrls: ['./update-promotion.component.scss'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None,
})
export class UpdatePromotionComponent implements OnInit {
  promotion: any = [];
  promotionId!: any;
  addUsers: Array<string> = [];
  searchResults!: any[];
  searchTerm: any;
  showDropdown!: boolean;
  participantsMap: any = [];
  authorName!: string;
  authorId: any;
  resources: any = [];
  topic: any;
  topics: any[] = [];
  participants: any[] = [];

  constructor(
    private promotionsService: PromotionsService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private userService: UserService,
    private datePipe: DatePipe,
    private sanitizer: DomSanitizer
  ) {}
  formatDate(date: string | null): string {
    if (date === null) {
      return '';
    }
    return this.datePipe.transform(date, 'dd MMMM yyyy') || '';
  }
  getSanitizedDescription(description: string): SafeHtml {
    const sanitizedDescription = this.removeMediaFromDescription(description);
    return this.sanitizer.bypassSecurityTrustHtml(sanitizedDescription);
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.promotionId = params.get('id');

      this.promotionsService.getPromoById(this.promotionId).subscribe(
        (promotion) => {
          this.promotion = promotion;

          this.authorId = this.promotion.authorId;

          this.userService.getUserName(this.authorId).subscribe((authorName: string) => {
            this.authorName = authorName;
          });
          this.promotion.resourceIds.forEach((resourceId: string) => {
            this.getResourceLinkAndTitle(resourceId).subscribe((resource: any) => {
              this.resources.push(resource);
            });
          });
          this.promotion.topicIds.forEach((topicId: string) => {
            this.getTopic(topicId).subscribe((topic: any) => {
              this.topics.push(topic);
            });
          });
          this.promotion.participantsIds.forEach((participantId: string) => {
            this.promotionsService.getParticipantName(participantId).subscribe((participant: Participant) => {
              this.participantsMap.push(participant);
            });
          });
        },
        (error) => {
          console.error('Error fetching promotion details:', error);
        }
      );
    });
  }

  getResourceLinkAndTitle(resourceId: string): Observable<any> {
    return this.promotionsService.getResourceById(resourceId);
  }
  getTopic(topicId: string): Observable<any> {
    return this.promotionsService.geTopicById(topicId);
  }
  onDeletePromotion(promoId: string) {
    this.promotionsService.deletePromotion(promoId).subscribe(
      () => {
        alert('Promotion deleted successfully!');
      },
      (error) => {
        console.error('Error deleting promotion:', error);
      }
    );
  }

  selectUser(userId: string): void {
    const selectedUser = this.searchResults.find((user) => user.id === userId);

    if (selectedUser && !this.participants.find((participant) => participant.id === userId)) {
      const fullName = selectedUser.firstname + ' ' + selectedUser.lastname;
      this.participants.push({ id: userId, fullName: fullName });
      this.addUsers.push(userId);
      this.showDropdown = false;
      this.searchTerm = '';
      const index = this.searchResults.findIndex((user) => user.id === userId);
      if (index !== -1) {
        this.searchResults.splice(index, 1);
      }
    }
  }

  searchParticipants(): void {
    if (this.searchTerm.length >= 2) {
      const data = {
        content: this.searchTerm,
      };
      this.http.post<any[]>('http://localhost:8080/users/search', data).subscribe((participants: any[]) => {
        this.searchResults = participants.filter((participant) => !this.addUsers.includes(participant.id));
        this.showDropdown = true;
      });
    } else {
      this.showDropdown = false;
    }
  }

  getParticipantName(userId: string): string {
    const participant = this.searchResults.find((p) => p.id === userId);
    if (participant) {
      return `${participant.firstname} ${participant.lastname}`;
    }
    return '';
  }

  addParticipants(): void {
    this.promotionsService.addParticipantsToPromotion(this.promotionId, this.addUsers).subscribe(
      (response) => {
        this.addUsers.forEach((userId) => {
          const userData = { promotionId: this.promotionId };
          this.userService.updateUserById(userId, userData).subscribe();
        });

        this.addUsers.push(this.promotion.participantsIds);
      },
      (error) => {
        console.error('Failed to add participants to promotion:', error);
      }
    );
  }

  deleteParticipantFromPromotion(selectedParticipantId: string, authorId: string): void {
    this.promotionsService.getParticipantId(selectedParticipantId).subscribe((participant) => {
      if (!participant) {
        console.error('Participant not found with ID:', selectedParticipantId);
        return;
      }
    });

    this.promotionsService
      .deleteParticipantById(this.promotionId, selectedParticipantId, authorId)
      .subscribe((promotion) => {
        console.info('Promotion after delete:', promotion);
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
}
