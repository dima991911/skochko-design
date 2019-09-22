import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';

const logos = [
  {name: 'New Logo', background: 'red'},
  {name: 'Old Logo', background: 'blue'},
  {name: 'Some Logo White', background: 'green'},
  {name: 'Some Logo Dima', background: 'yellow'},
  {name: 'Some Logo Vadym', background: 'cyan'},
  {name: 'Some Logo Olesya', background: 'pink'},
];

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  logos: object[] = logos;

  canScroll: boolean = true;
  currentMenuItem: number = 0;
  touchStartYoffset: number;

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
    document.getElementById('section' + (item)).scrollIntoView();
    this.currentMenuItem = item;
  }

  setCurrentMenu(menuItem: number) {
    this.nextMenuItem(menuItem);
  }
}
