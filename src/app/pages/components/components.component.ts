import { Component } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { LocalDataSource } from 'ng2-smart-table';
import { RequestOptionsArgs } from '@angular/http/src/interfaces';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';

@Component({
  selector: 'ngx-components',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class ComponentsComponent {
}
