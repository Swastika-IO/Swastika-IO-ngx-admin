import { NgModule } from '@angular/core';
import { InputFileModule, InputFileOptions, InputFileRepository } from 'ngx-input-file';
import { BrowserModule } from '@angular/platform-browser';

const options: InputFileOptions = new InputFileOptions(
    'auth-token-value',
    'Authorization'
);

@NgModule({
    imports: [ 
        BrowserModule,
        InputFileModule,    
    ]
})

export class NgxInputFileModule {
    constructor(private repository: InputFileRepository) {
        repository.setOptions(options);
    }
}