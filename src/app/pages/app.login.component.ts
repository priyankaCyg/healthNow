import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
})
export class AppLoginComponent {

  dark: boolean;

  checked: boolean;
  constructor( private apiService: ApiService){
    
  }
  
}
