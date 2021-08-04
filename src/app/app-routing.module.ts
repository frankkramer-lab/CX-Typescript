import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentationComponent } from './components/pages/documentation/documentation.component';
import { EditComponent } from './components/pages/edit/edit.component';
import { HomeComponent } from './components/pages/home/home.component';
import { StatisticsComponent } from './components/pages/statistics/statistics.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'doc',
    component: DocumentationComponent,
    pathMatch: 'full',
  },
  {
    path: 'editor',
    component: EditComponent,
    pathMatch: 'full',
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
