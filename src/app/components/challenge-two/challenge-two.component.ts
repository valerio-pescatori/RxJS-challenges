import {
  AfterViewInit,
  Component,
  Inject,
  InjectionToken,
} from '@angular/core';
import { fromEvent, map, Observable, Subscription, tap } from 'rxjs';

function pageVisibilityProvider(): Observable<Boolean> {
  return fromEvent(document, 'visibilitychange').pipe(
    map(() => document.visibilityState == 'visible'),
    tap((x) => console.log('PAGE' + (x ? ' ' : ' NOT ') + 'VISIBLE'))
  );
}

export const PAGE_VISBILITY_SERVICE = new InjectionToken<Observable<Boolean>>(
  'PAGE_VISIBILTY_SERVICE'
);

@Component({
  selector: 'app-challenge-two',
  templateUrl: './challenge-two.component.html',
  styleUrls: ['./challenge-two.component.css'],
  providers: [
    { provide: PAGE_VISBILITY_SERVICE, useFactory: pageVisibilityProvider },
  ],
})
export class ChallengeTwoComponent implements AfterViewInit {
  subs: Subscription | undefined;

  constructor(
    @Inject(PAGE_VISBILITY_SERVICE)
    private pageVisibilityService: Observable<Boolean>
  ) {}

  ngAfterViewInit(): void {
    this.subs = this.pageVisibilityService.subscribe();
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }
}
