import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
  },

  {
    path: 'blog',
    loadChildren: './blog/blog.module#BlogModule',
  },
];
