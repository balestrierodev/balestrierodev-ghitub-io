import { Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, startWith, Subject, switchMap } from 'rxjs';
import * as showdown from 'showdown';
import { GithubApiService } from 'src/app/services/github-api-service';

@Component({
    selector: 'tips',
    templateUrl: './tips.component.html',
    styleUrls: ['./tips.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TipsComponent implements OnInit, OnDestroy {

    tip: any = null
    tips: any = []

    destroy$: Subject<boolean> = new Subject()

    get nativeElement(): ElementRef {
        return this.elementRef.nativeElement
    }

    constructor(private githubApiService: GithubApiService, private route: ActivatedRoute, private elementRef: ElementRef) { }

    ngOnInit(): void {

        this.githubApiService.tips$.pipe(switchMap((tipsData: any) => {
            this.tip = null
            const converter = new showdown.Converter()
            const splitData = tipsData.split("---").filter((t: any) => t.trim() != "")
            this.tips = splitData.map((row: string, i: number) => {
                const title = row.match(/#### (.+)/i)![1]
                const body = converter.makeHtml(row.replace("#### " + title, ""))
                console.debug(body)
                return {
                    id: i,
                    title,
                    body
                }
            })

            return interval(10000).pipe(startWith(0))

        })).subscribe(_ => {
            console.log('entro')
            const newTip = this.getTip()
            this.tip = null
            setTimeout(() => {
                this.tip = newTip
            }, 0);
        })
    }

    getTip(): any {
        const newTip = this.tips[Math.floor(Math.random() * this.tips.length)]
        if (this.tip?.id == newTip.id) {
            return this.getTip()
        }
        return newTip
    }

    ngOnDestroy(): void {
        this.destroy$.next(true)
        this.destroy$.complete()
    }

}
