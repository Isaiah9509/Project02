import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { RegisterComponent } from './components/register/register.component';
import { SavedTicketsComponent } from './components/saved-tickets/saved-tickets.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const routes = 
    [
        {path:'', redirectTo:'/login', pathMatch:'full'},
        {path:'login', component: LoginComponent},
        {path: 'register', component: RegisterComponent},
        {path: 'user-page', component: UserPageComponent},
        {path:'saved-tickets', component: SavedTicketsComponent},
        {path: 'purchase', component: PurchaseComponent},
        {path: 'main-page', component: MainPageComponent}
    ]

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
})

export class AppRoutingModule{}