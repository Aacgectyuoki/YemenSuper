import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus, init } from '@emailjs/browser';
init("user_66nwzX6xZ5j1WCaDKBM51");

@Component({
  selector: 'contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {

  public sendEmail(e: Event): void {
    e.preventDefault();
    emailjs.sendForm('service_kjtfle7', 'template_bvy474i', e.target as HTMLFormElement, 'user_66nwzX6xZ5j1WCaDKBM51')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }
}