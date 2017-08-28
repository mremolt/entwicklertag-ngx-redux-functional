import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

// export function homeRoute(): LoadChildrenCallback {
//   return './home/home.module#HomeModule';
// }

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    // loadChildren: homeRoute
    component: HomeComponent
  }
];
