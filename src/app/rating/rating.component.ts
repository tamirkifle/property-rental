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
  inputRating: number = null;

  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.stars = Array.from(
      this.ratingContainer.nativeElement.querySelectorAll('.star')
    );
    if (this.type === 'input') {
      this.generateInputRating();
    } else {
      this.generateRating();
    }
  }
  generateRating() {
    this.ratingContainer.nativeElement.title = this.rating;
    const fullStarsToShow = Math.floor(this.rating);
    const partStarsToShow = this.rating - fullStarsToShow;
    this.stars.some((star, i) => {
      if (i === Math.ceil(this.rating) - 1) {
        if (Math.ceil(this.rating) === this.rating) {
          star.style.opacity = '0%';
        }
        return true;
      }
      star.style.opacity = '0%';
    });
    this.ratingContainer.nativeElement.querySelector('.color').style.width = `${
      28 * fullStarsToShow + partStarsToShow * 20
    }px`;
    console.log(
      this.ratingContainer.nativeElement.querySelector('.color').style.width
    );
  }

  // generateRating() {
  //   this.fillStarsUntil(this.rating - 1, '#28b6f6');
  //   if (this.rating - Math.floor(this.rating) > 0) {
  //     this.stars[Math.floor(this.rating)].classList.add('fa-star-half-o');
  //     this.stars[Math.floor(this.rating)].style.color = '#28b6f6';
  //   }
  // }
  private removeFillAllStars() {
    this.stars.forEach((star: HTMLElement) => {
      star.classList.add('fa-star-o');
      star.style.color = '#707070';
    });
  }
  private fillStarsUntil(index = this.stars.length, color?) {
    this.removeFillAllStars();
    this.stars.some((star, i) => {
      if (i > index) {
        return true;
      }
      star.classList.remove('fa-star-o');
      if (color) {
        star.style.color = color;
      }
    });
  }
  generateInputRating() {
    function isFilled(star) {
      return !star.classList.contains('fa-star-o');
    }

    let getStarsInfo = (clickedStar) => {
      let clickedIndex = -1;
      let filledAfterClickedStar = false;
      this.stars.some((star, i) => {
        if (clickedIndex !== -1) {
          if (isFilled(star)) {
            // Are there stars filled after the clicked star?
            filledAfterClickedStar = true;
            return true;
          }
        }
        if (clickedStar === star) {
          clickedIndex = i;
        }
      });
      return { clickedIndex, filledAfterClickedStar };
    };

    let fillStars = (e): void => {
      const { clickedIndex, filledAfterClickedStar } = getStarsInfo(
        e.currentTarget
      );
      this.inputRating = clickedIndex + 1;
      if (filledAfterClickedStar) {
        this.fillStarsUntil(clickedIndex, '#28b667');
      } else {
        if (isFilled(e.currentTarget)) {
          this.removeFillAllStars();
          this.inputRating = null;
        } else {
          this.fillStarsUntil(clickedIndex, '#28b667');
        }
      }
    };
    this.stars.forEach((star: HTMLElement) => {
      star.addEventListener('click', fillStars);
    });
    this.ratingContainer.nativeElement.classList.add('input');
  }

  // generateInputRating(){
  //   let filled = false;

  //   let colorGrey = () => {
  //     if(filled){
  //       this.stars.forEach((s: HTMLElement) => (s.style.color = '#28b6f6'));
  //       return;
  //     }
  //     this.stars.forEach((s: HTMLElement) => (s.style.color = '#707070'));
  //   };

  //   let colorStars = (e): void => {
  //     this.stars.some((star) => {
  //       star.style.color = '#28b6f6';
  //       if (star === e.currentTarget) {
  //         star.style.color = '#28b6f6';
  //         return true;
  //       }
  //     });
  //   };
  //   this.stars.forEach((star: HTMLElement) =>
  //     star.addEventListener('mouseenter', colorStars)
  //   );
  //   this.stars.forEach((star: HTMLElement) =>
  //     star.addEventListener('mouseleave', colorGrey)
  //   );
  // }
}
