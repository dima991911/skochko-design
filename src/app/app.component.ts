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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  canScroll: boolean = true;
  currentMenuItem: number = 0;
  logos: object[] = logos;

  @ViewChild('mainContainer', {static: false}) public mainContainer: ElementRef<any>;

  @HostListener('wheel', ['$event'])
  onScrollMainSection(e) {
    if (this.canScroll) {
      this.canScroll = false;
      if (e.deltaY > 0 && this.logos[this.currentMenuItem + 1]) {
        document.getElementById('section' + (this.currentMenuItem + 1)).scrollIntoView();
        this.currentMenuItem += 1;
      } else if (e.deltaY < 0 && this.logos[this.currentMenuItem - 1]) {
        document.getElementById('section' + (this.currentMenuItem - 1)).scrollIntoView();
        this.currentMenuItem -= 1;
      }
      setTimeout(() => this.canScroll = true, 1000);
    }
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(e) {
    console.log(e);
  }
}
