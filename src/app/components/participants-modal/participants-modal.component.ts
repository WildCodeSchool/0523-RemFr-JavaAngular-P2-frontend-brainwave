import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';velopment';

@Component({
  selector: 'app-participants-modal',
  templateUrl: './participants-modal.component.html',
  styleUrls: ['./participants-modal.component.scss'],
})
export class ParticipantsModalComponent implements OnInit {
  @Input()
  createdPromoId!: string;

  participantsIds: string;
  participants: any[] = [];
  participantName: string;
  searchTerm = '';
  showDropdown = false;
  searchResults: any[] = [];
  promotionId: any;
  participantId: string;
  createdPromotionId: string | null;
  addUsers: Array<string> = [];

  constructor(private http: HttpClient, private userService: UserService, private route: ActivatedRoute) {
    this.participantsIds = '';
    this.participants = [];
    this.participantName = '';
    this.searchTerm = '';
    this.showDropdown = false;
    this.searchResults = [];
    this.promotionId = '';
    this.participantId = '';
    this.createdPromotionId = '';
  }
  ngOnInit(): void {
    this.userService.getUsers();
    this.createdPromotionId = this.route.snapshot.paramMap.get('id');

    this.createdPromoId;
  }

  onFocus(): void {
    if (this.searchTerm.length >= 2) {
      this.showDropdown = true;
    }
  }
  searchParticipants(): void {
    if (this.searchTerm.length >= 2) {
      const data = {
        content: this.searchTerm,
      };
      this.http.post<any[]>(environment.apiUrl + '/users/search', data).subscribe(
        (participants: any[]) => {
          this.searchResults = participants.filter((participant) => !this.addUsers.includes(participant.id));
          this.showDropdown = true;
        },
        (error) => {
          console.error('Failed to search participants:', error);
        }
      );
    } else {
      this.showDropdown = false;
    }
  }

  selectUser(userId: string): void {
    const selectedUser = this.searchResults.find((user) => user.id === userId);

    if (selectedUser && !this.participants.includes(selectedUser)) {
      const fullName = selectedUser.firstname + ' ' + selectedUser.lastname;
      this.participants.push(fullName);
      this.participantId = userId;
      this.participantsIds = this.participants.map((user) => user.id).join(',');
      this.searchResults = [];
      this.showDropdown = false;
      this.searchTerm = '';
      this.addUsers.push(userId);
    }
  }

  addParticipantToPromotion(): void {
    //TODO modifier ici
    const url = environment.apiUrl + `/promotions/${this.createdPromotionId}/add-participants`;

    this.http.put(url, { participants: this.addUsers }).subscribe(
      (response) => {
        alert("Votre liste d'étudiant a été créée pour cette promotion ");
      },
      (error) => {
        console.error('Failed to add participant to promotion:', error);
      }
    );
  }
  removeParticipant(participant: string): void {
    const indexToRemove = this.participants.indexOf(participant);
    if (indexToRemove !== -1) {
      this.participants.splice(indexToRemove, 1);
      const userIdToRemove = this.addUsers.find((id) => {
        const selectedUser = this.searchResults.find((user) => user.id === id);
        return selectedUser ? `${selectedUser.firstname} ${selectedUser.lastname}` === participant : false;
      });
      if (userIdToRemove) {
        const indexToRemoveUser = this.addUsers.indexOf(userIdToRemove);
        if (indexToRemoveUser !== -1) {
          this.addUsers.splice(indexToRemoveUser, 1);
        }
      }
    }
  }
}
