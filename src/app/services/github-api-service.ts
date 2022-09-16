import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { environment } from "src/environments/environment"

@Injectable({
    providedIn: 'root'
})
export class GithubApiService {

    pages$: Observable<any> = this.httpClient.get(environment.readme, { responseType: 'text' })
    tips$: Observable<any> = this.httpClient.get(environment.tips, { responseType: 'text' })
    questions$: Observable<any> = this.httpClient.get(environment.questions, { responseType: 'text' })

    constructor(private httpClient: HttpClient) { }
}
