import { Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { PortfolioPageComponent } from './portfolio-page/portfolio-page.component';

export const router: Routes = [
    { path: '', component: HomePageComponent, pathMatch: 'full' },
    { path: 'portfolio', component: PortfolioPageComponent }
];
