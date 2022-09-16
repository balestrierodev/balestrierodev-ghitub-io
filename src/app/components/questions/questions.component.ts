import { Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import * as showdown from 'showdown';
import { GithubApiService } from 'src/app/services/github-api-service';

@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuestionsComponent implements OnInit, OnDestroy {

  questions: any = []

  destroy$: Subject<boolean> = new Subject()

  get nativeElement(): ElementRef {
    return this.elementRef.nativeElement
  }

  constructor(private githubApiService: GithubApiService, private route: ActivatedRoute, private elementRef: ElementRef) { }

  ngOnInit(): void {

    this.githubApiService.questions$.subscribe((questionsData: any) => {
      const converter = new showdown.Converter()
      const splitData = questionsData.split("---").filter((t: any) => t.trim() != "")
      this.questions = splitData.map((row: string, i: number) => {
        const title = row.match(/### (.+)/i)![1]
        const body = converter.makeHtml(row.replace("### " + title, ""))
        console.debug(body)
        return {
          id: i,
          title,
          body
        }
      })
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.complete()
  }

}
