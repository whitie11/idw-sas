import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {


    // private baseUrl = 'https://localhost:44378/';

  //  private baseUrl = 'http://sasdatamanager1-env.bm8hz53wy9.eu-west-2.elasticbeanstalk.com/';

    private baseUrl = 'http://sasdatamanager-env.hesnzb2zru.eu-west-2.elasticbeanstalk.com/';

    private baseRegisterUrl = this.baseUrl + 'api/account/register';

    private baseLoginURL  = this.baseUrl + 'api/account/login';

    private allPatientsUrl = this.baseUrl + 'api/patient/getallpatients';

    private WardListUrl = this.baseUrl + 'api/admission/getwardlist/';

    private patientByIdUrl = this.baseUrl + 'api/patient/getpatient/';

    private tokenUrl = this.baseUrl + 'token';

    private obsRangeuUrl = this.baseUrl + 'api/observation/findbyrange/';

    private obsRangeuUrl2 = this.baseUrl + 'api/observation/findbyrange2/';

    constructor() { }

    getWardList() {
        return [
            {label: 'Keats', value: 'Keats'},
            {label: 'Byron', value: 'Byron'},
            {label: 'Churchill', value: 'Churchill'},
            {label: 'Orwell', value: 'Orwell'},
            {label: 'Shakespeare', value: 'Sakespeare'},
            {label: 'Stevenson', value: 'Stevenson'},
            {label: 'Austen', value: 'Austen'},
            {label: 'Dickens', value: 'Dickens'},
            {label: 'Wordsworth', value: 'Wordsworth'},
            {label: 'Bronte', value: 'Bronte'}
        ];
    }

    getBaseLoginUrl() {
        return this.baseLoginURL;
    }

    getAllPatientsUrl() {
        return this.allPatientsUrl;
    }

    getWardListUrl() {
        return this.WardListUrl;
    }

    getpatientByIdUrl() {
        return this.patientByIdUrl;
    }

    getRegisterdUrl() {
        return this.baseRegisterUrl;
    }

    getTokendUrl() {
        return this.tokenUrl;
    }

    getObsRangeUrl() {
        return this.obsRangeuUrl;
    }

    getObsRangeUrl2() {
        return this.obsRangeuUrl2;
    }

}
