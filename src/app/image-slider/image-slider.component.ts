import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../property';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
})
export class ImageSliderComponent implements OnInit {
  @Input() property: Property;

  constructor() {}

  ngOnInit(): void {
    // this.allImages = Array.from(
    //   document.querySelectorAll('.post_img')
    // );
    // console.log(this.allImages);
    // console.log(this.property);
    // this.allImages[0].classList.add('showing');
    // this.allImages[1].classList.add("right");
    // this.allImages[this.allImages.length-1].classList.add("left");
  }

  slideImage(dir): void {
    const allImages = Array.from(
         document.querySelectorAll('.post_img'));
    let currentIndex = -1;
    allImages.some((img: HTMLElement, i) => {
      if (img.classList.contains('showing')) {
        currentIndex = i;
        return true;
      }
    });

    function indexStep(collection, from, step): number {
      if (from + step > collection.length - 1) {
        return from + step - collection.length;
      } else if (from + step < 0) {
        return from + step + collection.length;
      } else {
        return from + step;
      }
    }
    allImages.forEach((i) => {
        i.classList.remove('left');
        i.classList.remove('right');
        i.classList.remove('showing');
    });
    if (dir === 'left') {
      allImages[currentIndex].classList.add('left');
      allImages[indexStep(allImages, currentIndex, 1)].classList.add(
        'showing'
      );
      allImages[indexStep(allImages, currentIndex, 2)].classList.add(
        'right'
      );
    } else if (dir === 'right') {
      allImages[currentIndex].classList.add('right');
      // allImages[currentIndex].classList.remove('showing');
      allImages[indexStep(allImages, currentIndex, -1)].classList.add(
        'showing'
      );
      allImages[indexStep(allImages, currentIndex, -2)].classList.add(
        'left'
      );
    }
  }
}
