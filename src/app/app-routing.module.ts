import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengeOneComponent } from './components/challenge-one/challenge-one.component';
import { ChallengeThreeComponent } from './components/challenge-three/challenge-three.component';
import { ChallengeTwoComponent } from './components/challenge-two/challenge-two.component';

const routes: Routes = [
  {
    path: 'challenge-one',
    component: ChallengeOneComponent,
  },
  {
    path: 'challenge-two',
    component: ChallengeTwoComponent,
  },
  {
    path: 'challenge-three',
    component: ChallengeThreeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
