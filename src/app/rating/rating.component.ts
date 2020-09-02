import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { generate } from 'rxjs';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  @Input() rating = 0;
  @Input() type: 'input' | 'display' = 'display';
  @ViewChild('ratingContainer') ratingContainer;
  private stars: HTMLElement[];

  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.stars = Array.from(
      this.ratingContainer.nativeElement.children
    );
    console.log(this.stars);
    if (this.type === 'input') {
      this.generateInputRating();
    } else {
      this.generateRating();
    }
  }
  generateRating() {
    if (this.rating > 0 && this.rating < 1) {
      this.stars[0].classList.add('fa-star-half-o');
    } else if (this.rating === 1) {
      this.stars[0].classList.remove('fa-star-o');
      // this.stars[0].classList.add('fa-star');
    } else if (this.rating > 1 && this.rating < 2) {
      this.stars[0].classList.remove('fa-star-o');
      this.stars[1].classList.add('fa-star-half-o');
    } else if (this.rating === 2) {
      this.stars[0].classList.remove('fa-star-o');
      this.stars[1].classList.remove('fa-star-o');
    } else if (this.rating > 2 && this.rating < 3) {
      this.stars[0].classList.remove('fa-star-o');
      this.stars[1].classList.remove('fa-star-o');
      this.stars[2].classList.add('fa-star-half-o');
    } else if (this.rating === 3) {
      this.stars[0].classList.remove('fa-star-o');
      this.stars[1].classList.remove('fa-star-o');
      this.stars[2].classList.remove('fa-star-o');
    } else if (this.rating > 3 && this.rating < 4) {
      this.stars[0].classList.remove('fa-star-o');
      this.stars[1].classList.remove('fa-star-o');
      this.stars[2].classList.remove('fa-star-o');
      this.stars[3].classList.add('fa-star-half-o');
    } else if (this.rating === 4) {
      this.stars[0].classList.remove('fa-star-o');
      this.stars[1].classList.remove('fa-star-o');
      this.stars[2].classList.remove('fa-star-o');
      this.stars[3].classList.remove('fa-star-o');
    } else if (this.rating > 4 && this.rating < 5) {
      this.stars[0].classList.remove('fa-star-o');
      this.stars[1].classList.remove('fa-star-o');
      this.stars[2].classList.remove('fa-star-o');
      this.stars[3].classList.remove('fa-star-o');
      this.stars[4].classList.add('fa-star-half-o');
    } else if (this.rating === 5) {
      this.stars[0].classList.remove('fa-star-o');
      this.stars[1].classList.remove('fa-star-o');
      this.stars[2].classList.remove('fa-star-o');
      this.stars[3].classList.remove('fa-star-o');
      this.stars[4].classList.remove('fa-star-o');
    }
  }

  generateInputRating(){
    let filled = false;

    let colorGrey = () => {
      if(filled){
        this.stars.forEach((s: HTMLElement) => (s.style.color = '#28b6f6'));
        return;
      }
      this.stars.forEach((s: HTMLElement) => (s.style.color = '#707070'));
    };

    let colorStars = (e): void => {
      this.stars.some((star) => {
        star.style.color = '#28b6f6';
        if (star === e.currentTarget) {
          star.style.color = '#28b6f6';
          return true;
        }
      });
    };
    let fillStars = (e): void => {
      this.stars.forEach(star => star.classList.add('fa-star-o'));
      this.stars.some((star) => {
        star.classList.remove('fa-star-o');
        if (star === e.currentTarget) {
          star.classList.remove('fa-star-o');
          filled = true;
          return true;
        }
      });
      return;
    };

    this.stars.forEach((star: HTMLElement) =>
      star.addEventListener('mouseenter', colorStars)
    );
    this.stars.forEach((star: HTMLElement) =>
      star.addEventListener('mouseleave', colorGrey)
    );
    this.stars.forEach((star: HTMLElement) =>
      star.addEventListener('click', fillStars)
    );
  }
}
