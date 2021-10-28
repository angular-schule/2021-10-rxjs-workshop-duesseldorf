import { Component } from '@angular/core';
import { Subject, ReplaySubject, of } from 'rxjs';
import { scan, reduce } from 'rxjs/operators';

@Component({
  selector: 'rxw-game-score',
  templateUrl: './game-score.component.html',
})
export class GameScoreComponent {

  logStream$ = new ReplaySubject<string | number>();
  score$ = new Subject<number>();

  currentScore = 0;

  constructor() {
    /**
     * Wir entwickeln ein spannendes Browser-Spiel!
     * Jetzt fehlt nur noch der Code, um den aktuellen Punktestand zu ermitteln...
     */

    /******************************/

    // 1 ---- 3 ---- 5 ---- 10
    // 1 ---- 4 ---- 9 ---- 19
    // [1,3,5,10].reduce((acc, item) => acc + item); // result: 19

    this.score$.pipe(
      scan((acc, item) => acc + item, 0)
    ).subscribe(score => {
      this.currentScore = score;
    });

    ///

    // IDEE Redux-Pattern / NgRx
    of(
      /*{ name: 'Ferdinand' },
      { city: 'Leipzig' },
      { name: 'RS', city: 'Benrath' },
      { framework: 'Angular' },
      { name: 'Rising Systems' },*/
      'SETNAMEF',
      'SETCITYL',
      'SETNAMERS',
      'XXXX',
      'SETFRANG',
    ).pipe(
      scan((state: any, msg: string) => {
        switch (msg) {
          case 'SETFRANG': return { ...state, framework: 'Angular' };
          case 'SETNAMEF': return { ...state, name: 'Ferdinand' };
          case 'SETNAMERS': return { ...state, name: 'RS' };
          case 'SETCITYL': return { ...state, city: 'Leipzig' };
          case 'SETCITYB': return { ...state, city: 'Benrath' };
          default: return state;
        }
      }, { name: '', city: '', framework: '' })
    ).subscribe(e => console.log(e))


    /******************************/

    this.score$.subscribe({
      next: e => this.logStream$.next(e),
      complete: () => this.logStream$.next('✅ COMPLETE')
    });
  }

  finishGame() {
    this.score$.complete();
  }

  addScore(amount: number) {
    this.score$.next(amount);
  }

}
