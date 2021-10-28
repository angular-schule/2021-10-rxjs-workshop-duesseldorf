import { Component } from '@angular/core';
import { Subject, ReplaySubject, Observable, of } from 'rxjs';
import { mergeMap, concatMap, switchMap, exhaustMap, map, mergeAll, delay, toArray, subscribeOn, tap } from 'rxjs/operators';

import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'rxw-higherorder',
  templateUrl: './higherorder.component.html',
})
export class HigherorderComponent {

  logStream$ = new ReplaySubject<string>();
  source$ = new Subject<string>();

  result$: Observable<string>;

  constructor(private es: ExerciseService) {

    /**
     * Löse für jedes Tier-Event im source$-Stream ein Echo aus.
     * Die Methode `this.es.echo()` gibt ein Observable zurück, das Echos produziert.
     * Probiere aus, wie sich concatMap, mergeMap, switchMap und exhaustMap unterschiedlich verhalten.
     *
     * Quelle: this.source$
     * Ziel:   this.result$
     */

    /**************!!**************/

    this.result$ = this.source$.pipe(
      mergeMap(tier => this.es.echo(tier)),
    );

      /*
    of(
      of('1').pipe(tap(e => console.log('started', e)),delay(1000), tap(e => console.log('ended', e))),
      of('2').pipe(tap(e => console.log('started', e)),delay(1000), tap(e => console.log('ended', e))),
      of('3').pipe(tap(e => console.log('started', e)),delay(1000), tap(e => console.log('ended', e))),
      of('4').pipe(tap(e => console.log('started', e)),delay(1000), tap(e => console.log('ended', e))),
      of('5').pipe(tap(e => console.log('started', e)),delay(1000), tap(e => console.log('ended', e))),
      of('6').pipe(tap(e => console.log('started', e)),delay(1000), tap(e => console.log('ended', e))),
      of('7').pipe(tap(e => console.log('started', e)),delay(1000), tap(e => console.log('ended', e))),
    ).pipe(
      mergeAll(1),
      toArray()
    ).subscribe(e => console.log(e));
    */

    /**************!!**************/

    this.source$.subscribe(value => this.logStream$.next(`SOURCE: ${value}`));
    this.result$.subscribe(value => this.logStream$.next(`🚀 ${value}`));
  }

  echoTest() {
    this.es.echo('TEST').subscribe(value => this.logStream$.next(value));
  }

  sendValue(value: string) {
    this.source$.next(value);
  }

}
