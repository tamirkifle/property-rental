import { Component, OnInit, Input } from '@angular/core';
import { generate } from 'rxjs';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  @Input() rating: number;
  constructor() {}

  ngOnInit(): void {
    this.generateRating(this.rating);
    console.log(this.rating);
  }

  generateRating(rating: number) {
    const ratingContainer = document.querySelector('.rating_container');
    const stars = ratingContainer.children;
    if (rating > 0 && rating < 1) {
      stars[0].classList.add('fa-star-half-o');
    }
    else if (rating === 1) {
      stars[0].classList.remove('fa-star-o');
      // stars[0].classList.add('fa-star');
    }
    else if (rating > 1 && rating < 2) {
      stars[0].classList.remove('fa-star-o');
      stars[1].classList.add('fa-star-half-o');
    }
    else if (rating === 2) {
      stars[0].classList.remove('fa-star-o');
      stars[1].classList.remove('fa-star-o');
    }
    else if (rating > 2 && rating < 3) {
      stars[0].classList.remove('fa-star-o');
      stars[1].classList.remove('fa-star-o');
      stars[2].classList.add('fa-star-half-o');
    }
    else if (rating === 3) {
      stars[0].classList.remove('fa-star-o');
      stars[1].classList.remove('fa-star-o');
      stars[2].classList.remove('fa-star-o');
    }
    else if (rating > 3 && rating < 4) {
      stars[0].classList.remove('fa-star-o');
      stars[1].classList.remove('fa-star-o');
      stars[2].classList.remove('fa-star-o');
      stars[3].classList.add('fa-star-half-o');
    }
    else if (rating === 4) {
      stars[0].classList.remove('fa-star-o');
      stars[1].classList.remove('fa-star-o');
      stars[2].classList.remove('fa-star-o');
      stars[3].classList.remove('fa-star-o');
    }
    else if (rating > 4 && rating < 5) {
      stars[0].classList.remove('fa-star-o');
      stars[1].classList.remove('fa-star-o');
      stars[2].classList.remove('fa-star-o');
      stars[3].classList.remove('fa-star-o');
      stars[4].classList.add('fa-star-half-o');
    }
    else if (rating === 5) {
      stars[0].classList.remove('fa-star-o');
      stars[1].classList.remove('fa-star-o');
      stars[2].classList.remove('fa-star-o');
      stars[3].classList.remove('fa-star-o');
      stars[4].classList.remove('fa-star-o');
    }
  }
}
