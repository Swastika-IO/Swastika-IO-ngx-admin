import { ServerDataSource } from '../../pages/components/components.component';
import { Exclude, Transform } from "class-transformer";
import { LocalDataSource } from 'ng2-smart-table';

export class SupportdCulture {
    id: number = 1;
    specificulture: string = 'test';
    lcid: string;
    alias: string;
    fullName: string;
    description: string;
    icon: string;
    isSupported: boolean;
}

export class Template {
    fileFolder: string;
    filename: string;
    extension: string;
    content: string;
    fileStream: string;
}

export class CategotyModuleNav {
    articleId: string;
    categoryId: number;
    specificulture: string;
    isActived: boolean;
    description: string;
}


export class ModuleModuleNav {
    articleId: string;
    moduleId: number;
    specificulture: string;
    isActived: boolean;
    description: string;
}

export class ModuleBackend {
    id: string;
    specificulture: string;
    image: string;
    imageFileStream: string;
    thumbnail: string;
    thumbnailFileStream: string;
    title: string;
    staticUrl: string;
    fullContent: string; // -> content
    excerpt: string;
    content: string;
    seoname: string;
    seotitle: string;
    seodescription: string;
    seokeywords: string;
    source: string;
    views: string;
    type: number;
    createdDateTime: Date;
    createdBy: string;
    isVisible: boolean;
    isDeleted: boolean;
    template: string;

    listSupportedCulture: SupportdCulture[];
    categories: CategotyModuleNav[];
    modules: ModuleModuleNav[];
    moduleNavs: ModuleModuleNav[];
    activedModules: ModuleFullDetails[];
    @Exclude()
    subModules: SWDataTable[];
    listTag: string[];
    view: Template;
    templates: Template[];
    constructor(){}
}

export class PagingData {
    endPoint: string;
    sortBy: string;
    sortDirection: number;
    pageIndex: number;
    pageSize: number;
    totalPage: number;
    totalItems: number;
    items: any[];
    jsonItems: any[];
}

export class ApiResult {
    isSucceed: boolean;
    data: any;
    errors: string[];
    ex: any;
}

export class SWDataTable{
    models: any;
    source: LocalDataSource;
    settings: any;
}

export class ModuleListItem {
    id: number;
    specificulture: string;
    name: string;
    template: string;
    description: string;
    fields: string;
    columns: DataColumn[];
    title: string;
    articleId: string;
    categoryId: string;
    view: string;

    
}

export class ModuleFullDetails {
    id: number;
    specificulture: string;
    name: string;
    template: string;
    description: string;
    fields: string;
    columns: DataColumn[];
    title: string;
    articleId: string;
    categoryId: string;
    view: string;
    data: PagingData; // <ModuleDataDetails>
}

export class ModuleDataDetails {
    id: string;
    moduleId: number;
    specificulture: string;
    fields: string;
    value: string;
    articleId: string;
    categoryId: string;
    createdDate: Date;
    priority: number;
    dataProperties: DataProperty[];
    columns: DataColumn[];
}



export class DataProperty {
    moduleId: number;
    name: string;
    dataType: number;
    value: string;
    stringValue: string;
}

export class DataColumn {
    name: string;
    dataType: DataType;
    isDisplay: boolean;
    width: number;
}

export enum DataType {
    String = 0,
    Int = 1,
    Image = 2,
    Icon = 3,
    CodeEditor = 4,
    Html = 5,
    TextArea = 6,
    Boolean = 7
}
