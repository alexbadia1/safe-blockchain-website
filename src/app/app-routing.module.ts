import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { PeersComponent } from './peers/peers.component';

const routes: Routes = [
  { path: "", component: HomeComponent }, 
  { path: "create", component: CreateComponent }, 
  { path: "security-demo", component: PeersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
