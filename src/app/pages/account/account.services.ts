import { Injectable } from "@angular/core";
import { ServiceHelper } from "app/@swastika-io/helpers/sw.service.helper";
import { environment } from "environments/environment";
import { LoginViewModel } from "app/@swastika-io/viewmodels/article.viewmodels";
import { StorageService } from "app/@swastika-io/helpers/localStorage.service";
import { ApiResult } from "app/@swastika-io/viewmodels/module.viewmodels";

@Injectable()
export class AccountService {
    constructor(private serviceHelper: ServiceHelper
        , private storageService: StorageService
    ) {

    }

    login(login: LoginViewModel): Promise<any> {
        const saveUrl = environment.apiUrl + environment.culture + '/account/login';
        return this.serviceHelper.postWithPromise(saveUrl, login)
            .then(result => {
                this.storageService.saveLocalData(environment.localStorageKeys.accessToken, result.data);
            });
    }
    
}