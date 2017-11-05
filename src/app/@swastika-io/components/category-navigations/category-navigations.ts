import { Component, Input, OnInit } from '@angular/core';
@Component({
    selector: 'sw-category-nav',
    templateUrl: 'category-navigations.html',
})
export class CategoryNavsComponent implements OnInit {
    navs: any;
    @Input() navigations: any;

    ngOnInit() {
        this.navs = this.navigations;
    }
}
