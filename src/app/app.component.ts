import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'yemen-super';
  constructor(private meta: Meta) {
    this.meta.addTag({ 
      name: 'description', 
      content: `Yemen Super is an online supermarket in the United States that transports materials made in Yemen.`
     })
  }
}
