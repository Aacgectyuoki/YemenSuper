import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import {render} from 'creditcardpayments/creditCardPayments';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent  {
  constructor(){
    const myValue: any = "1.00";
    console.log(myValue);
    render(
      {
        id: "#myPaypalButtons",
        currency: "USD",
        value: myValue,
        onApprove: (details) => {
          alert("Success");
        }
      }
    );
  }
}