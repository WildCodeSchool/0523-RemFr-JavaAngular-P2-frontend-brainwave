import Quill from 'quill';
import 'quill-emoji/dist/quill-emoji.js';
import { Component, AfterViewInit, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { Promotion } from 'src/models/Promotion';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';velopment';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss'],
})
export class PromotionsComponent implements AfterViewInit, OnInit {
  @Output() promoAdded: EventEmitter<Promotion> = new EventEmitter<Promotion>();
  showModal = false;
  quill!: Quill;
  textValue: string;
  description: string;
  picture: string;
  tag: string;
  createdPromoId: string;
  userConnected!: any;
  userId!: string;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {
    this.userConnected = this.authService.getUserConnected();
    this.textValue = '';
    this.description = '';
    this.picture = '';
    this.tag = '';
    this.createdPromoId = '';
    this.authService.getUserConnected().subscribe((user: any) => {
      this.userConnected = user;
      this.userId = user?.userId;
    });
  }
  openParticipantsModal(): void {
    this.showModal = true;
  }

  closeParticipantsModal(): void {
    this.showModal = false;
  }
  ngOnInit(): void {
    this.userService.getUsers();
  }

  ngAfterViewInit() {
    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],
      ['emoji', 'link', 'image', 'video'],
      [{ color: [] }, { background: [] }],
      ['clean'],
      [{ size: ['small', false, 'large', 'huge'] }],
    ];

    this.quill = new Quill('#editor', {
      modules: {
        toolbar: toolbarOptions,
        'emoji-toolbar': true,
        'emoji-textarea': true,
        'emoji-shortname': true,
      },
      theme: 'snow',
    });

    const emojiButton = this.quill.getModule('emoji-toolbar');
    emojiButton.initToolbar();
  }
  createPromotion(): void {
    const descriptionText = this.quill.root.innerHTML;

    const userId = this.userConnected.id;
    const url = environment.apiUrl + `/promotions/${userId}`;

    const data = {
      description: descriptionText,
      name: this.textValue,
      tag: this.tag,
    };

    this.http.post<Promotion>(url, data).subscribe(
      (response) => {
        const createdPromotionId = response.id;
        localStorage.setItem('createdPromotionId', createdPromotionId);
        this.promoAdded.emit(response);
        alert('La promotion est créée avec succès !');
        this.createdPromoId;

        this.router.navigate(['/addParticipants', createdPromotionId]);
      },
      (error) => {
        console.error('Failed to create promotion', error);
      }
    );
  }
}
