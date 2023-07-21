import Quill from 'quill';
import 'quill-emoji/dist/quill-emoji.js';
import { Component, AfterViewInit, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { Promotion } from 'src/models/Promotion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss', '../../../styles.scss'],
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
  constructor(private http: HttpClient, private userService: UserService, private router: Router) {
    this.textValue = '';
    this.description = '';
    this.picture = '';
    this.tag = '';
    this.createdPromoId = '';
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
  sendText(): void {
    const descriptionText = this.quill.root.innerHTML;
    const url = 'http://localhost:8080/promotions/857c8c7d-719e-444c-ab02-d0772bb7dc6d';

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

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.picture = file;
    }
  }

  uploadImage(promotionId: string): void {
    const uploadUrl = 'http://localhost:8080/upload-image';
    const formData: FormData = new FormData();
    formData.append('picture', this.picture);
    formData.append('promotionId', promotionId);

    this.http.post(uploadUrl, formData).subscribe(
      (response: any) => {
        console.info('Image uploaded successfully!', response);
      },
      (error) => {
        console.error('Failed to upload image', error);
      }
    );
  }
}
