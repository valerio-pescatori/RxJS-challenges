import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChallengeOneComponent } from './components/challenge-one/challenge-one.component';
import { ChallengeTwoComponent } from './components/challenge-two/challenge-two.component';

@NgModule({
  declarations: [
    AppComponent,
    ChallengeOneComponent,
    ChallengeTwoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
