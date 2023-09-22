import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, CommonModule, NgTemplateOutlet } from '@angular/common';
import { HeroButtonComponent } from '../hero-button/hero-button.component';
import { interval, map, startWith } from 'rxjs';
import { AddMobileClassDirective } from 'src/app/shared/directives/add-mobile-class.directive';

interface Slide {
  title: string;
  subtitle: string;
  src: string;
}

@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [HeroButtonComponent, NgTemplateOutlet, AsyncPipe,AddMobileClassDirective],
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideshowComponent {
  slideIntervalTime = 20000; //change every 20 seconds
  currentSlide = 0;
  constructor() {
  
  }
  slides: Slide[] = [
    {
      title: 'WELCOME AT LIFESTYLE GYM.',
      subtitle: 'FITNESS FOR EVERYBODY',
      src: 'https://assets.website-files.com/55f3386352c98c9a451280f9/5e3447af99e6ac3503527e27_man-carrying-barbel-791763.jpg',
    },
    {
      title: 'GET 1 MONTH FOR FREE!',
      subtitle: 'SIGN UP FOR A SUBSCRIPTION NOW!',
      src: 'https://assets.website-files.com/55f3386352c98c9a451280f9/5e3447aec45382e96c5a6117_active-adult-athlete-body-416778.jpg',
    },
    {
      title: 'CHANGE YOUR LIFESTYLE.',
      subtitle: "IT'S NEVER TOO LATE FOR A CHANGE",
      src: 'https://assets.website-files.com/55f3386352c98c9a451280f9/5e3447afd4897d07b87c0526_man-holding-black-dumbbell-1229356.jpg',
    },
  ];

  get slide$() {
    return interval(this.slideIntervalTime).pipe(
      startWith(0),
      map(() => {
        let currentSlide = this.currentSlide;
        const slidesN = this.slides.length;
        currentSlide++;
        if (currentSlide === slidesN) {
          currentSlide = 0;
        }
        this.currentSlide = currentSlide;
        return this.slides[currentSlide];
      })
    );
  }
}
