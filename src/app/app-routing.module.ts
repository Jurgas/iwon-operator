import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CollectComponent} from './collect/collect.component';
import {EditComponent} from './edit/edit.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'collect', component: CollectComponent},
  {path: 'edit', component: EditComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
