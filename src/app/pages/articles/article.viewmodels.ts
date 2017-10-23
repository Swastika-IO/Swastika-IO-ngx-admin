export class SupportdCulture{
    id: number;
    specificulture: string;
    lcid: string;
    alias: string;
    fullName: string;
    description: string;
    icon: string;
    isSupported: boolean;
}

export class Template{
    fileFolder: string;
    filename: string;
    extension: string;
    content: string;
    fileStream: string;
}

export class CategotyArticleNav{
    articleId: string;
    categoryId: number;
    specificulture: string;
    isActived: boolean;
    description: string;
}

export class ModuleArticleNav{
    articleId: string;
    moduleId: number;
    specificulture: string;
    isActived: boolean;
    description: string;
}

export class ArticleModuleNav{
    articleId: string;
    id: number;
    specificulture: string;
    isActived: boolean;
    description: string;
}

export class ArticleBackend{
    id: string;
    specificulture: string;
    image: string;
    thumbnail: string;
    title: string;
    staticUrl: string;
    briefContent: string;
    fullContent: string;
    seoname: string;
    seotitle: string;
    seodescription: string;
    seokeywords: string;
    source: string;
    views: string;
    type: number;
    createdDate: Date;
    createdBy: string;
    isVisible: boolean;
    isDeleted: boolean;
    template: string;

    listSupportedCulture: SupportdCulture[];
    categories: CategotyArticleNav[];
    modules:ModuleArticleNav[];
    moduleNavs: ArticleModuleNav[];
    view: Template;
    templates: Template[];
}

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

export class ApiResult
{
    isSucceed: boolean;
    data: any;
    errors: string[];
    ex: any;
}