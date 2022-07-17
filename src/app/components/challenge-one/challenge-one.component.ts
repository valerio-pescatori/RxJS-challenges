import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  exhaustMap,
  filter,
  fromEvent,
  Observable,
  repeat,
  Subscription,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { PAGE_VISBILITY_SERVICE } from '../challenge-two/challenge-two.component';

@Component({
  selector: 'app-challenge-one',
  templateUrl: './challenge-one.component.html',
  styleUrls: ['./challenge-one.component.css'],
})
export class ChallengeOneComponent implements AfterViewInit, OnDestroy {
  @ViewChild('toTrack') toTrack!: ElementRef<HTMLDivElement>;
  subs: Subscription | undefined;

  focused: HTMLElement | null = null;

  ngAfterViewInit(): void {
    // listen for focus out only after a focus in has occurred
    let focus$ = fromEvent(this.toTrack.nativeElement, 'focusin');

    let blur$ = focus$.pipe(
      exhaustMap(() =>
        fromEvent(document, 'focusin').pipe(
          filter((e) => !this.toTrack.nativeElement.contains(e.target as Node)),
          take(1),
          tap(() => (this.focused = null))
        )
      )
    );

    this.subs = focus$
      .pipe(
        tap((e) => (this.focused = e.target as HTMLElement)),
        takeUntil(blur$),
        repeat()
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
