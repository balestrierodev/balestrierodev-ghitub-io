import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { TipsComponent } from './components/tips/tips.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { GithubApiService } from './services/github-api-service';

@NgModule({
    declarations: [
        AppComponent,
        HomepageComponent,
        HeaderComponent,
        TipsComponent,
        QuestionsComponent,
        FooterComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
    providers: [GithubApiService],
    bootstrap: [AppComponent],
})
export class AppModule {}
