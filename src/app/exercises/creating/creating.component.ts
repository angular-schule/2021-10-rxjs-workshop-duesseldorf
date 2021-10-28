import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'rxw-creating',
  templateUrl: './creating.component.html',
})
export class CreatingComponent {

  logStream$ = new ReplaySubject<string | number>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/


    // of('A', 'B', 'R', 'S')
    // const myArr = [1,2,3,4,5,6];
    // from(myArr)
    // interval(1000)
    // timer(0, 1000)

    timer(500, 500).pipe(
      map(e => e * 3), // Projektionsfunktion
      filter(e => e % 2 === 0) // Prädikatsfunktion
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    });



    /******************************/

    function producer(o: any) {
      o.next(Math.random());
      o.next(2);
      setTimeout(() => {
        o.next(3);
      }, 2000);

      setTimeout(() => {
        o.complete();
      }, 3000);
    }

    const myObs$ = new Observable(producer);

    const observer = {
      next: (e: any) => console.log(e),
      error: (e: any) => console.error(e),
      complete: () => console.log('COMPLETE')
    };
    // myObs$.subscribe(observer);


    // producer(obs);


    /*class MyObservable {
      private producer: any;

      constructor(producer: any) {
        this.producer = producer;
      }

      subscribe(observer) {
        const subscriber = this.sanitizeObserver(observer);
        this.producer(subscriber);
      }
    }*/



    /******************************/
  }

  private log(msg: string | number) {
    this.logStream$.next(msg);
  }

}
