
export enum ProductActionsTypes{
  GET_ALL_PRODUCTS="[Product] Get all products",
  GET_SELECTED_PRODUCTS="[Product] Get selected products",
  GET_AVAILABLE_PRODUCTS="[Product] Get available products",
  SEARCH_PRODUCTS="[Product] Get search products",
  NEW_PRODUCTS="[Product] Get new products",
  SELECT_PRODUCTS="[Product] Get Select products",
  EDIT_PRODUCTS="[Product] Get Edit products",
  DELETE_PRODUCTS="[Product] Get Delete products",
  PRODUCTS_ADDED="[Product] product Added",
  PRODUCTS_UPDATED="[Product]  product updated"

}

export interface ActionEvent {
  type:ProductActionsTypes,
  payload?:any
}

export enum dataStateEnum {

  LOADING,
  LOADED,
  ERROR
}

export interface appDataState<T> {
  dataState?:dataStateEnum,
  data?:T,
  errorMessage?:string
}
