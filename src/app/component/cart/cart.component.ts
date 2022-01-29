import { Component, OnInit } from '@angular/core';
import { CardsModule } from 'angular-bootstrap-md';
//import { Server } from 'http';
import { CartService } from 'src/app/service/service.service';
import { CheckoutService } from 'src/app/service/checkout.service';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { StripeService } from 'ngx-stripe';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products : any = [];
  public grandTotal !: number;
  paymentHandler: any = null;
  constructor(private cartService : CartService, private http: HttpClient,
    private stripeService: StripeService) { }

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

  checkout() {
    // Check the server.js tab to see an example implementation
    this.http.post('/create-checkout-session', {})
      .pipe(
        switchMap(session => {
          //@ts-ignore
          return this.stripeService.redirectToCheckout({ sessionId: session.id })
        })
      )
      .subscribe(result => {
        // If `redirectToCheckout` fails due to a browser or network
        // error, you should display the localized error message to your
        // customer using `error.message`.
        if (result.error) {
          alert(result.error.message);
        }
      });
  }
}