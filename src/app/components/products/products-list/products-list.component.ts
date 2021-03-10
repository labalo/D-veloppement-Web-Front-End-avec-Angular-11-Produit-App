import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {ActionEvent, appDataState, dataStateEnum, ProductActionsTypes} from '../../../state/product.state';
import {Product} from '../../../model/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input() productsInput$:Observable<appDataState<Product[]>> | null=null;
  //@Output() ProductsEventEmitter:EventEmitter<ActionEvent>= new EventEmitter<ActionEvent>();
  readonly dataStateEnum=dataStateEnum;

  constructor() { }

  ngOnInit() {
  }
 /*
  onSelect(p: Product) {
    this.ProductsEventEmitter.emit({type:ProductActionsTypes.SELECT_PRODUCTS,payload:p});
  }

  onDelete(p: Product) {
    this.ProductsEventEmitter.emit({type:ProductActionsTypes.DELETE_PRODUCTS,payload:p});
  }

  onEdit(p: Product) {
    this.ProductsEventEmitter.emit({type:ProductActionsTypes.EDIT_PRODUCTS,payload:p});
  }

  /*onActionEvent($event: ActionEvent) {
    this.ProductsEventEmitter.emit($event);
  }*/
}
