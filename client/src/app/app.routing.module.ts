import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateCardComponent } from "./create-card/create-card";
import { HomeComponent } from "./home/home.component";
import { OtpComponent } from "./otp-screen/otp";


const routes: Routes = [
    {path:'', redirectTo:'/home', pathMatch:'full'},
    { path: "home", component: HomeComponent },
    { path: "otp", component: OtpComponent },
    { path: "create", component: CreateCardComponent },
    // {path: '**', component: NotFoundComponent}
]

@NgModule({ 
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }