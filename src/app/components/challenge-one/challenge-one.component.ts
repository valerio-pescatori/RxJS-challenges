import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  filter,
  fromEvent,
  repeat,
  Subscription,
  take,
  takeUntil,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-challenge-one',
  templateUrl: './challenge-one.component.html',
  styleUrls: ['./challenge-one.component.css'],
})
export class ChallengeOneComponent implements AfterViewInit, OnDestroy {
  @ViewChild('toTrack') toTrack!: ElementRef<HTMLDivElement>;
  subs: Subscription | undefined;

  constructor() {}

  ngAfterViewInit(): void {
    let blur$ = fromEvent(document, 'focusin').pipe(
      filter((e) => !this.toTrack.nativeElement.contains(e.target as Node)),
      take(1),
      tap(() => console.log('FOCUSOUT'))
    );

    let focus$ = fromEvent(this.toTrack.nativeElement, 'focusin');

    focus$
      .pipe(
        tap((e) => console.log('FOCUSED:', e)),
        takeUntil(blur$),
        repeat()
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
