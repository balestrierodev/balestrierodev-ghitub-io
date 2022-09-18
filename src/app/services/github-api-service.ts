import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class GithubApiService {
    pages$: Observable<any> = this.getPage(environment.readme);
    tips$: Observable<any> = this.getPage(environment.tips);
    questions$: Observable<any> = this.getPage(environment.questions);

    constructor(private httpClient: HttpClient) {}

    getPage(page: string): Observable<any> {
        return this.httpClient.get(page, { responseType: 'text' });
    }
}
