import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    QueryList,
    ViewChildren,
    ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subject, takeUntil } from 'rxjs';
import * as showdown from 'showdown';
import { GithubApiService } from 'src/app/services/github-api-service';

@Component({
    selector: 'homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HomepageComponent implements AfterViewInit, OnDestroy {
    @ViewChildren('sections') pagesRef: QueryList<any> | undefined;

    page$ = this.githubApiService.pages$.pipe(
        map((rawPage) => {
            rawPage = rawPage.replace('#age#', new Date().getFullYear() - 1989);
            const converter = new showdown.Converter();
            showdown.setFlavor('github');
            rawPage = converter.makeHtml(rawPage);
            return rawPage;
        })
    );

    prevPage: any;
    nextPage: any;

    destroy$: Subject<boolean> = new Subject();

    constructor(
        private elementRef: ElementRef,
        private route: ActivatedRoute,
        private githubApiService: GithubApiService
    ) {}

    ngAfterViewInit(): void {
        this.route.params
            .pipe(takeUntil(this.destroy$))
            .subscribe((params: any) => {
                this.prevPage = null;
                this.nextPage = null;
            });
    }

    goTo(i: number) {
        this.pagesRef
            ?.toArray()
            [i].nativeElement.scrollIntoView({ behavior: 'smooth' });

        /** Maybe Fullscreen
      from(document.querySelector("html")!.requestFullscreen()).subscribe(_ => {
        setTimeout(() => {
          this.pagesRef?.nativeElement.scrollIntoView({ behavior: "smooth" })
        }, 500);
      })
    */
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
