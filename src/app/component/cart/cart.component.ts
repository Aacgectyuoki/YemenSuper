import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products : any = [];
  public grandTotal !: number;
  paymentHandler: any = null;
  //invokeStripe: any;
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
    this.invokeStripe()
  }

  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }

  emptycart(){
    this.cartService.removeAllCart();
  }

  makePayment(amount:any){
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key:
      'pk_test_51KB4AqHzyheHHaqUxDultJvUHaZMnbUS1s7KBJM176xaU0Wyk0HLZeLJnBAPRWw8mpZSX7GsagJAgf1sxP4CdcE500cZ37DCeY',
      locale: 'auto',
      token: function(stripeToken: any){
        console.log(stripeToken.card);
        alert("Stripe Token Generated!");
      },
    });

    paymentHandler.open({
      name: 'max',
      description: 'seller',
      amount: amount * 100,
    });
  }

  invokeStripe(){
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_51KB4AqHzyheHHaqUxDultJvUHaZMnbUS1s7KBJM176xaU0Wyk0HLZeLJnBAPRWw8mpZSX7GsagJAgf1sxP4CdcE500cZ37DCeY',
        locale: 'auto',
        token: function (stripeToken: any) {
          console.log(stripeToken)
          alert('Payment has been successfull!');
        }
      });
    }
    window.document.body.appendChild(script);
    }
  }
}
