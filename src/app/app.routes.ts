import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { BlankLayout } from './layouts/blank-layout/blank-layout';
import { Notfound } from './components/notfound/notfound';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Home } from './components/home/home';
import { Product } from './components/product/product';
import { Cart } from './components/cart/cart';
import { Brands } from './components/brands/brands';
import { Categories } from './components/categories/categories';
import { authGuard } from './core/guards/auth-guard';
import { logedGuard } from './core/guards/loged-guard';

export const routes: Routes = [
  { path: '', component: AuthLayout,canActivate:[logedGuard],
    children:[
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: Login,title:'login' },
      { path: 'register', component: Register,title:"register" }
    ] 
},

  { path: '', component: BlankLayout, canActivate:[authGuard],
    children:[
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home,title:"home" },
      { path: 'products', component: Product,title:"products" },
      { path: 'cart', component: Cart,title:"cart" },
      { path: 'brands', component: Brands,title:"brands" },
      { path: 'categories', component: Categories,title:"categories" }
    ] 
},

  { path: '**', component: Notfound , title:"Notfound"}
];
