import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
  @Input() totalStars = 5;
  @Input() rating = 3.5;

  stars: number[] = [];

  isVoteModified: boolean = false;

  @Output() ratingChanged: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit() {
   
    this.stars = Array.from({ length: this.totalStars }, (_, index) => index + 1);
  }

  rate(star: number) {
    this.rating = star;
    this.isVoteModified = true;
    this.ratingChanged.emit(this.rating);
  }

  isStarFilled(star: number): boolean {
    return star <= this.rating;
  }

  isHalfStarDisplayed(star: number): boolean {
    const floorValue = Math.floor(this.rating);
    return star === floorValue + 0.5 && this.rating % 1 !== 0;
  }
}
