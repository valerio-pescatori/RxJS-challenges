import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  catchError,
  concat,
  concatMap,
  exhaustMap,
  filter,
  fromEvent,
  Observable,
  share,
  Subscription,
  take,
  tap,
  timer,
} from 'rxjs';
import { LoginService } from './login.service';

@Component({
  selector: 'app-challenge-three',
  templateUrl: './challenge-three.component.html',
  styleUrls: ['./challenge-three.component.css'],
})
export class ChallengeThreeComponent implements OnDestroy, AfterViewInit {
  login: 'success' | 'fail' | 'pending' = 'pending';
  username = '';
  subs: Subscription | undefined;
  @ViewChild('btn') btn: ElementRef | undefined;

  constructor(private loginService: LoginService) {}

  ngAfterViewInit(): void {
    const login$ = this.loginService.pipe(
      tap((x) => {
        this.username = x;
        this.login = 'success';
        console.log(x);
      }),
      catchError((e) => {
        this.login = 'fail';
        timer(5000)
          .pipe(
            tap(() => (this.login = 'pending')),
            take(1)
          )
          .subscribe();
        return '';
      })
    );

    this.subs = fromEvent(this.btn!.nativeElement, 'click')
      .pipe(exhaustMap(() => login$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
