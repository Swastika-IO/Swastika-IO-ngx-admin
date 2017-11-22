import { Component, OnInit } from '@angular/core';
import { LoginViewModel } from 'app/@swastika-io/viewmodels/article.viewmodels';
import { Router } from '@angular/router';
import { AccountService } from 'app/pages/account/account.services';

@Component({
    selector: 'sw-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    login = new LoginViewModel();
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {

    }
    ngOnInit(): void {
    }

    submit(): void {
        this.accountService.login(this.login).then(
            result => {
                if (result != undefined && result.isSucceed) {
                    this.router.navigate['/'];
                }
            });
    }
}