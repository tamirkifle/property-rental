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
    this.stars = Array.from(this.ratingContainer.nativeElement.children);
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

  generateInputRating() {
    function isFilled(star) {
      return !star.classList.contains('fa-star-o');
    }
    let removeFillAllStars = () => {
      this.stars.forEach((star: HTMLElement) => {
        star.classList.add('fa-star-o');
        star.style.color = '#707070';

      });
    };
    let fillStarsUntil = (index = this.stars.length) => {
      removeFillAllStars();
      this.stars.some((star, i) => {
        if(i > index){
          return true;
        }
        star.classList.remove('fa-star-o');
        star.style.color = '#28b667';

      });
    };
    let getStarsInfo = (clickedStar) => {
      let clickedIndex = -1;
      let filledAfterClickedStar = false;
      this.stars.some((star, i) => {
        if (clickedIndex !== -1) {
          if (isFilled(star)) {      // Are there stars filled after the clicked star?
            filledAfterClickedStar = true;
            return true;
          }
        }
        if (clickedStar === star) {
          clickedIndex = i;
        }
      });
      return {clickedIndex, filledAfterClickedStar};
    };

    let fillStars = (e): void => {
      let {clickedIndex, filledAfterClickedStar} = getStarsInfo(e.currentTarget);
      if (filledAfterClickedStar){
          fillStarsUntil(clickedIndex);
      }
      else{
        if(isFilled(e.currentTarget)){
          removeFillAllStars();
        }
        else{
          fillStarsUntil(clickedIndex);
        }
      }
    };
    this.stars.forEach((star: HTMLElement) =>
      star.addEventListener('click', fillStars)
    );
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
