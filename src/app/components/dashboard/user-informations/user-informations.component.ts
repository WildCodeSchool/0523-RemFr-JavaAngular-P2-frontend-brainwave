import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-user-informations',
  templateUrl: './user-informations.component.html',
  styleUrls: ['./user-informations.component.scss'],
})
export class UserInformationsComponent implements OnInit, OnDestroy {
  @Input() userData: any;
  selectedFile: File | null = null;
  avatarFilename!: string;
  avatarUrl: SafeUrl | string =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWje_gjVcmi-wks5nTRnW_xv5W2l3MVnk7W1QDcZuhNg&s';
  isEditingDescription = false;
  inputDescription = '';
  editIcon = 'assets/images/pencil.svg';
  closeEditIcon = 'assets/images/cross.svg';

  constructor(private userService: UserService, private sanitizer: DomSanitizer) {}

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    this.userService.uploadAvatar(this.selectedFile, this.userData.id)?.subscribe(() => this.loadAvatar());
  }

  private objectURL: string | undefined;

  ngOnInit(): void {
    if (this.userData.avatar !== null) {
      this.loadAvatar();
    }
  }

  ngOnDestroy(): void {
    if (this.objectURL) {
      URL.revokeObjectURL(this.objectURL);
    }
  }

  loadAvatar(): void {
    if (this.userData.avatar === null) {
      this.avatarFilename = this.userData.id + '.png';
    } else {
      this.avatarFilename = this.userData.avatar;
    }
    this.userService.getAvatar(this.avatarFilename).subscribe((res: Blob) => {
      if (this.objectURL) {
        URL.revokeObjectURL(this.objectURL);
      }
      this.objectURL = URL.createObjectURL(res);
      this.avatarUrl = this.sanitizer.bypassSecurityTrustUrl(this.objectURL);
    });
  }

  cancelUpdatedDescription() {
    if (this.isEditingDescription) {
      if (this.userData.description !== this.inputDescription) {
        this.inputDescription = this.userData.description;
        this.isEditingDescription = false;
      } else {
        this.isEditingDescription = false;
      }
    } else {
      this.inputDescription = this.userData.description;
      this.isEditingDescription = !this.isEditingDescription;
    }
  }

  onUpdateBio() {
    this.userData.description = this.inputDescription;
    this.userService.updateBio(this.userData.id, this.userData).subscribe(() => {
      this.isEditingDescription = false;
    });
  }
}
