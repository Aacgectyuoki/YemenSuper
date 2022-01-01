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
      'pk_live_51KB4AqHzyheHHaqUoqrzwi45kotoqE7VjW7mK4DK9vgYv4mJuRFuC4jqaj0O7hcQWJq7IZqwQ0tDrFPlS4vGTr0B00ge6YWXUI',
      locale: 'auto',
      token: function(stripeToken: any){
        console.log(stripeToken.card);
        alert("Stripe Token Generated!");
      },
    });

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
        key: 'pk_live_51KB4AqHzyheHHaqUoqrzwi45kotoqE7VjW7mK4DK9vgYv4mJuRFuC4jqaj0O7hcQWJq7IZqwQ0tDrFPlS4vGTr0B00ge6YWXUI',
        locale: 'auto',
        token: function (stripeToken: any) {
          console.log(stripeToken)
          alert('Payment has been successfull!');
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
