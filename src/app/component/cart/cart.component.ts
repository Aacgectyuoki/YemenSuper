import { Component, OnInit } from '@angular/core';
import { CardsModule } from 'angular-bootstrap-md';
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
  success: boolean = false;
  failure: boolean = false;
  //invokeStripe: any;
  constructor(private cartService : CartService, private checkout: CheckoutService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
   // this.invokeStripe()
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
  
/*
  makePayment(amount:number){
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key:
      'pk_test_51KB4AqHzyheHHaqUxDultJvUHaZMnbUS1s7KBJM176xaU0Wyk0HLZeLJnBAPRWw8mpZSX7GsagJAgf1sxP4CdcE500cZ37DCeY',
      locale: 'auto',
      token: function(stripeToken: any){
        console.log(stripeToken.card);
        paymentstripe(stripeToken.card);
        alert("Stripe Token Generated!");
      },
    });

    const paymentstripe = (stripeToken: any) => {
      this.checkout.makePayment(stripeToken).subscribe((data: any) => {
        console.log(data);
        if (data.data === "success") {
          this.success = true
        }
        else {
          this.failure = true
        }
      });
    };

    paymentHandler.open({
      name: 'Payment',
      description: 'Please use your credit/debit card to pay for your item(s)',
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
          //alert('Payment has been successfull!');
          // reduce the quantity of the item by 1 once the buyer's card went through
          // the buyer should recieve an email to notify that they have paid
          // the buyer should have the option in their email to cancel their payment, bringing the quantity back
        }
      });
    }
    window.document.body.appendChild(script);
    }
  }
}
*/
}