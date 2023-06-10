import { NgModule } from '@angular/core';

import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full'},
  { path: 'Home', component: HomePageComponent },
  { path: 'Create', component:CreatePageComponent},
  { path: 'Edit/:id', component:EditPageComponent},
  { path: 'View/:id', component:DetailPageComponent},
  { path: 'Delete', component:DetailPageComponent}
];

@NgModule({

  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
