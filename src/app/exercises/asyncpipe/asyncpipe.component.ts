import { Component } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { tap, scan } from 'rxjs/operators';

@Component({
  selector: 'rxw-fromevent',
  templateUrl: './asyncpipe.component.html',
  styles: ['.big-num {font-size: 120pt}']
})
export class AsyncpipeComponent {

  // result?: number;
  result$: Observable<number>;

  constructor() {

    /**
     * Verwende die AsyncPipe und verzichte auf den Einsatz von subscribe()!
     */

    /**************!!**************/

     this.result$ = timer(0, 700).pipe(
      scan((acc, item) => acc + item, 0),
      tap({
        next: e => console.log(e),
        complete: () => console.log('✅ COMPLETE')
      }),
     )// .subscribe(e => this.result = e);

    /**************!!**************/
  }

}
