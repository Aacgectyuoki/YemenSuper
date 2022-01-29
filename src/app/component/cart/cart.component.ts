import { Component, OnInit } from '@angular/core';
import { CardsModule } from 'angular-bootstrap-md';
//import { Server } from 'http';
import { CartService } from 'src/app/service/service.service';
import { CheckoutService } from 'src/app/service/checkout.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products : any = [];
  public grandTotal !: number;
  paymentHandler: any = null;
  constructor(private cartService : CartService, private checkout: CheckoutService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }

  totalItemPayment(quantity: number, price: number){
    return quantity * price;
  }

  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }

  emptycart(){
    this.cartService.removeAllCart();
  }
}