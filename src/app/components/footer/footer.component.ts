import { Component, ElementRef, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
@Component({
    selector: 'footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
    email: string = atob('YmFsZXN0cmllcm9kZXZAZ21haWwuY29t');
    number: string = atob('MzkzMzQyODExNTM2');
    whatsapp: string =
        'https://wa.me/' +
        this.number +
        '?text=' +
        encodeURIComponent(
            'Ciao Gianfilippo, ho visto il tuo sito e volevo chiederti...'
        );
    telegram: any = this.sanitizer.bypassSecurityTrustUrl(
        'tg://resolve?domain=balestrierodev'
    );
    repoUrl: string = environment.repo;

    now: any = Date.now();

    get nativeElement(): ElementRef {
        return this.elementRef.nativeElement;
    }

    constructor(
        private elementRef: ElementRef,
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {}
}
