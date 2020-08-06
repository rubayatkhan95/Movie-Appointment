import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { ListComponent } from './list/list.component';


const routes: Routes = [
  {path:' ', component:AppComponent},
  {path:'appointments', component:AppointmentComponent},
  {path:'lists', component:ListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
