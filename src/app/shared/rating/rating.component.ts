import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit, AfterViewInit {
  @Input() rating = 0;
  @Input() align: string = null;
  @Input() type: 'input' | 'display' = 'display';
  @ViewChild('ratingContainer') ratingContainer;
  private stars: HTMLElement[];
  inputRating: number = null;

  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    if (this.rating && this.align === 'left'){
      this.ratingContainer.nativeElement.style.transformOrigin = 'left';
    }
    if (this.rating){
      this.stars = Array.from(
        this.ratingContainer.nativeElement.querySelectorAll('.star')
      );
      if (this.type === 'input') {
        this.generateInputRating();
      } else {
        this.generateRating();
      }
    }

  }
  generateRating(): void {
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
    }px`; // 20 is width of the star and 8 is the right margin between stars
  }

  private removeFillAllStars(): void {
    this.stars.forEach((star: HTMLElement) => {
      star.classList.add('fa-star-o');
      star.style.color = '#707070';
    });
  }
  private fillStarsUntil(
    index: number = this.stars.length,
    color: string
  ): void {
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
  generateInputRating(): void {
    function isFilled(star: HTMLElement): boolean {
      return !star.classList.contains('fa-star-o');
    }

    const getStarsInfo = (clickedStar: HTMLElement) => {
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

    const fillStars = (e: Event): void => {
      const { clickedIndex, filledAfterClickedStar } = getStarsInfo(
        e.currentTarget as HTMLElement
      );
      this.inputRating = clickedIndex + 1;
      if (filledAfterClickedStar) {
        this.fillStarsUntil(clickedIndex, '#28b667');
      } else {
        if (isFilled(e.currentTarget as HTMLElement)) {
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
}
