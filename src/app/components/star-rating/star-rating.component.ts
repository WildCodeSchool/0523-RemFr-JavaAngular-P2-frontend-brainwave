import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  @Input() totalStars = 5;
  @Input() rating = 3;


  stars: number[] = [];

  isVoteModified: boolean = false;

  @Output() ratingChanged: EventEmitter<number> = new EventEmitter<number>();

  rate(star: number) {
    this.rating = star;
    this.isVoteModified = true;
    this.ratingChanged.emit(this.rating);
  }
}
