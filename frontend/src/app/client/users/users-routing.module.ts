import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from "./users.component";
import {OffertsComponent} from "./pages/offerts/offerts.component";


const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/table/table.module').then(m => m.TableModule)
      },
      {
        path: 'details/:id',
        loadChildren: () => import('./pages/view-details/view-details.module').then(m => m.ViewDetailsModule)
      }
    ]
  },
  {
    path: 'offerts',
    component: OffertsComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
