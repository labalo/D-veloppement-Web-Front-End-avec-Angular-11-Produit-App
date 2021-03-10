import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../model/product.model';
import {Observable, of} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';
import {ActionEvent, appDataState, dataStateEnum, ProductActionsTypes} from '../../state/product.state';
import {Router} from '@angular/router';
import {EventDriverService} from '../../state/event.driver.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

   products$:Observable<appDataState<Product[]>> | null=null;
   readonly dataStateEnum=dataStateEnum;

  constructor(private productsService:ProductsService,private router:Router,private eventDriverService:EventDriverService) { }

  ngOnInit() {
    this.eventDriverService.sourceEventSubjectObservable.subscribe((actionEvent:ActionEvent)=>{
      this.onActionEvent(actionEvent);
      });
  }

  onGetAllProducts() {
   // console.log("start ...");
    this.products$=
      this.productsService.getAllProducts().pipe(
        map(data=>{
          //console.log(data);
         return  ({dataState:dataStateEnum.LOADED,data:data})
        }),
            startWith({dataState :dataStateEnum.LOADING}),
            catchError(err =>of({dataState : dataStateEnum.ERROR,errorMessage:err.message}))

    );
  }

  onGetSelectedProducts() {
    this.products$=
      this.productsService.getSelectedProducts().pipe(
        map(data=>{
          return ({dataState:dataStateEnum.LOADED,data:data})
        }),
        startWith({dataState :dataStateEnum.LOADING}),
        catchError(err =>of({dataState : dataStateEnum.ERROR,errorMessage:err.message}))
      );
  }

  onGetAvailableProducts() {
    this.products$=
      this.productsService.getAvailableProducts().pipe(
        map(data=>{
          return ({dataState:dataStateEnum.LOADED,data:data})
        }),
        startWith({dataState :dataStateEnum.LOADING}),
        catchError(err =>of({dataState : dataStateEnum.ERROR,errorMessage:err.message}))
      );
  }

  onSearch(dataForm: any) {
    this.products$=
      this.productsService.searchProducts(dataForm.keyword).pipe(
        map(data=>{
          return ({dataState:dataStateEnum.LOADED,data:data})
        }),
        startWith({dataState :dataStateEnum.LOADING}),
        catchError(err =>of({dataState : dataStateEnum.ERROR,errorMessage:err.message}))
      );
  }


  onSelect(p: Product) {
  this.productsService.select(p)
    .subscribe(data=>{
      p.selected=data.selected;
    })
  }

  onDelete(p: Product) {
    let m=confirm("Etes vous sûre de supprimer ")
    if(m==true)
    this.productsService.delete(p)
      .subscribe(data=>{
        this.onGetAllProducts();
      })
  }

  onNewProducts() {
    this.router.navigateByUrl("/newProduct");
  }

  onEdit(p: Product) {
    this.router.navigateByUrl("/editProduct/"+p.id);
  }

  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case ProductActionsTypes.GET_ALL_PRODUCTS:this.onGetAllProducts();break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS:this.onGetSelectedProducts();break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS:this.onGetAvailableProducts();break;
      case ProductActionsTypes.SEARCH_PRODUCTS:this.onSearch($event.payload);break;
      case ProductActionsTypes.NEW_PRODUCTS:this.onNewProducts();break;
      case ProductActionsTypes.SELECT_PRODUCTS:this.onSelect($event.payload);break;
      case ProductActionsTypes.EDIT_PRODUCTS:this.onEdit($event.payload);break;
      case ProductActionsTypes.DELETE_PRODUCTS:this.onDelete($event.payload);break;
    }
  }
}

