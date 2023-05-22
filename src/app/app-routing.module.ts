import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { RouteNotFoundComponent } from './public/route-not-found/route-not-found.component';
import { ComponentsModule } from './components/components.module';


const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "",
    pathMatch: 'full',
    redirectTo: "/components/login"
  },
  {
    path: "components",
    loadChildren: () => import("./components/components.module").then(m => m.ComponentsModule),
  },
  {
    path: "**",
    component: RouteNotFoundComponent,
    redirectTo: ""
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
