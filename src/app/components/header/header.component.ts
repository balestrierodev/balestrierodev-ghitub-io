import {
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GithubApiService } from 'src/app/services/github-api-service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    title: string = environment.config.title;
    subtitle: string = environment.config.subtitle;
    pages$ = this.githubApiService.pages$;
    destroy$: Subject<boolean> = new Subject();

    currentPath = '';

    @Output() onGoTo: any = new EventEmitter();

    constructor(
        private githubApiService: GithubApiService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params
            .pipe(takeUntil(this.destroy$))
            .subscribe((params: any) => {
                this.currentPath = params['id'];
            });
    }

    goTo(i: number) {
        this.onGoTo.emit(i);
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
