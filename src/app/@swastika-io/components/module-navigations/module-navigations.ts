import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
@Component({
    selector: 'sw-module-nav',
    templateUrl: 'module-navigations.html',
})
export class ModuleNavsComponent implements OnInit {
    navs: any;
    title: string = "Modules"
    @Output() onSuggest: EventEmitter<any> = new EventEmitter();
    @Input() navigations: any;
    @Input() header: string;
    ngOnInit() {
        this.navs = this.navigations;
        if (this.header != undefined) {
            this.title = this.header;
        }

    }
    onChange(event){
        this.onSuggest.emit(event);
    }
}
