import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Product} from '../model/product.model';

@Injectable({providedIn: "root"})
export  class ProductsService {

    constructor(private http:HttpClient) {
    }

  getSelectedProducts():Observable<Product[]>{
    let host=environment.host;
    return this.http.get<Product[]>(host+"/product?selected=true")
  }

  getAvailableProducts():Observable<Product[]>{
    let host=environment.host;
    return this.http.get<Product[]>(host + "/product?available=true")
  }

  getAllProducts():Observable<Product[]> {
    //let host=(Math.random()>0.2)?environment.host:environment.unreachableHost;
    let host=environment.host;
    return this.http.get<Product[]>(host+ "/product")
  }

  searchProducts(keyword:string):Observable<Product[]> {
    let host=environment.host;
    return this.http.get<Product[]>(host+ "/product?name_like=" + keyword)
  }

  select(produit:Product):Observable<Product> {
    let host=environment.host;
    produit.selected=!produit.selected;
    return this.http.put<Product>(host+ "/product/" + produit.id,produit)
  }

  delete(produit:Product):Observable<void> {
    let host=environment.host;
    return this.http.delete<void>(host+ "/product/" + produit.id)
  }

  save(produit:Product):Observable<Product> {
    let host=environment.host;
    return this.http.post<Product>(host+ "/product" ,produit)
  }

  getProduct(id: number):Observable<Product>  {
    let host=environment.host;
    return this.http.get<Product>(host+ "/product/" +id);
  }

  updateProduct(product:Product) :Observable<Product>  {
    let host=environment.host;
    return this.http.put<Product>(host+ "/product" + "/" + product.id,product);
  }
}
