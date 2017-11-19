import { Component, OnInit } from '@angular/core';
import { LoginViewModel } from 'app/@swastika-io/viewmodels/article.viewmodels';
import { Router } from '@angular/router';

@Component({
    selector: 'sw-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{
    login= new LoginViewModel();
    constructor(
        private router: Router
    ){

    }
    ngOnInit(): void {
    }
    
    
}