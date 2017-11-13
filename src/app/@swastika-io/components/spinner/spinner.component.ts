import { Component, Input } from '@angular/core';
import "es6-shim";
@Component({
    selector: 'sw-spinner',
    templateUrl: './spinner.component.html',
})
export class SWSpinnerComponent {
    @Input() visible = true; 
}