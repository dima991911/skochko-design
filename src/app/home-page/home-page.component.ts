import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

const logos = [
  {
    name: 'Ditching Disposables',
    backgroundUrl: 'assets/logos_bg/ditching_disposables_bg.jpg',
    logoUrl: 'assets/logos/ditching_disposables_logo.png'
  },
  {
    name: 'Prosper Video',
    backgroundUrl: 'assets/logos_bg/prosper.video_bg.jpg',
    logoUrl: 'assets/logos/prosper.video_logo.png'
  },
  {
    name: 'le Montnoir',
    backgroundUrl: 'assets/logos_bg/le_montnoir_bg.jpg',
    logoUrl: 'assets/logos/le_montnoir_logo.png'
  },
  {
    name: 'Beard Style',
    backgroundUrl: 'assets/logos_bg/beard_style_bg.jpg',
    logoUrl: 'assets/logos/beard_style_logo.png'
  },
  {
    name: 'Sakseide',
    backgroundUrl: 'assets/logos_bg/sakseide_bg.jpg',
    logoUrl: 'assets/logos/sakseide_logo.png'
  },
  {
    name: 'Aaron Anthony',
    backgroundUrl: 'assets/logos_bg/aaron_anthony_bg.jpg',
    logoUrl: 'assets/logos/aaron_anthony_logo.png'
  },
  {
    name: 'Emily J',
    backgroundUrl: 'assets/logos_bg/emily_j_bg.jpg',
    logoUrl: 'assets/logos/emily_j_logo.png'
  }
];

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  animations: [
    trigger('changeVisibleArrow', [
      state('showTopArrow', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      state('hideTopArrow', style({
        transform: 'translateY(100%)',
        opacity: 0
      })),
      transition('showTopArrow=>hideTopArrow', animate('400ms ease-in')),
      transition('hideTopArrow=>showTopArrow', animate('400ms ease-in'))
    ]),
  ]
})
export class HomePageComponent {
  logos: object[] = logos;

  canScroll: boolean = true;
  currentMenuItem: number = 0;
  touchStartYoffset: number;
  visibleTopArrow: string = 'hideTopArrow';

  @ViewChild('mainContainer', {static: false}) public mainContainer: ElementRef<any>;

  @HostListener('wheel', ['$event'])
  onScrollMainSection(e) {
    if (this.canScroll) {
      if (e.deltaY > 0 && this.logos[this.currentMenuItem + 1]) {
        this.canScroll = false;
        this.nextMenuItem(this.currentMenuItem + 1);
      } else if (e.deltaY < 0 && this.logos[this.currentMenuItem - 1]) {
        this.canScroll = false;
        this.nextMenuItem(this.currentMenuItem - 1);
      }
      setTimeout(() => this.canScroll = true, 1000);
    }
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(e) {
    this.touchStartYoffset = e.changedTouches[0].screenY;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(e) {
    if (e.changedTouches[0].screenY < this.touchStartYoffset && this.logos[this.currentMenuItem + 1]) {
      this.nextMenuItem(this.currentMenuItem + 1);
    } else if (e.changedTouches[0].screenY > this.touchStartYoffset && this.logos[this.currentMenuItem - 1]) {
      this.nextMenuItem(this.currentMenuItem - 1);
    }
  }

  nextMenuItem(item: number) {
    this.visibleTopArrow = item === 0 ? 'hideTopArrow' : 'showTopArrow';
    document.getElementById('section' + (item)).scrollIntoView();
    this.currentMenuItem = item;
  }

  setCurrentMenu(menuItem: number) {
    this.nextMenuItem(menuItem);
  }
}
