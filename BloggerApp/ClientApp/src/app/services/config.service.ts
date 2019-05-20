import { Injectable } from '@angular/core';
 
@Injectable()
export class ConfigService {
     
    private apiURI: string;
 
    constructor() {
        this.apiURI = 'https://localhost:5001/api/';
     }
 
     getApiURI() {
         return this.apiURI;
     }    
}