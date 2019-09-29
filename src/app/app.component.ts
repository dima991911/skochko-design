import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('toggleMenu', [
      state('showMenu', style({
        transform: 'translateX(0)',
        zIndex: 9
      })),
      state('hideMenu', style({
        transform: 'translateX(-100%)',
        zIndex: 0
      })),
      transition('showMenu=>hideMenu', animate('350ms ease-out')),
      transition('hideMenu=>showMenu', animate('350ms ease-out'))
    ])
  ]
})
export class AppComponent {
  isMenuVisible: string = 'hideMenu';

    constructor(private router: Router) {
        router.events.subscribe((val) => {
            this.isMenuVisible = 'hideMenu';
        });
    }

  onToggleMenu() {
    this.isMenuVisible = this.isMenuVisible === 'hideMenu' ? 'showMenu' : 'hideMenu';
  }
}
