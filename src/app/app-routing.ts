import { Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';

export const router: Routes = [
    { path: '', component: HomePageComponent, pathMatch: 'full' }
];
