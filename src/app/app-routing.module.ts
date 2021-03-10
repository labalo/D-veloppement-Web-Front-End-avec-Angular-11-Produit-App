import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsComponent} from './components/products/products.component';
import {HomeComponent} from './components/home/home.component';
import {ProductNewComponent} from './components/products/product-add/product-new.component';
import {ProductEditComponent} from './components/product-edit/product-edit.component';


const routes: Routes = [

  {path: 'products', component: ProductsComponent},
  {path: 'newProduct', component:ProductNewComponent},
  {path: '', component: HomeComponent},
  {path: 'editProduct/:id', component:ProductEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
