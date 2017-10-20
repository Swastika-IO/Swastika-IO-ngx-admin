import { Component, Input, OnInit } from '@angular/core';

import './ckeditor.loader';
import 'ckeditor';

@Component({
  selector: 'ngx-ckeditor',
  template: `
    <nb-card>      
      <nb-card-body>
        <ckeditor [ngModel]="renderValue"></ckeditor>
      </nb-card-body>
    </nb-card>
  `,
})
export class CKEditorComponent implements OnInit {
  renderValue: string;
  @Input() value: string;
  ngOnInit() {
    this.renderValue = this.value;
  }

}
