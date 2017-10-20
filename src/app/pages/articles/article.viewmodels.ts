export class ArticleListItem{
    id: string;
    specificulture: string;
    template: string;
    thumbnail: string;
    title: string;
    source: string;
    createdDateTime: string;
    updatedDateTime: string;
    createdBy: string;
    updatedBy: string;
    isVisible: string;
    isDeleted: string;
    detailsUrl: string;
    editUrl: string;
    constructor() {
    }
}

export class PagingData {
    endPoint: string;
    sortBy: string;
    sortDirection: number;
    pageIndex: number;
    pageSize: number;
    totalPage: number;
    totalItems: number;
    items: any[]
}