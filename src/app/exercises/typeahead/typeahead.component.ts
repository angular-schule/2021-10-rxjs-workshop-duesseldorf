import { Component } from '@angular/core';
import { TypeaheadService } from './typeahead.service';
import { FormControl } from '@angular/forms';
import { debounceTime, delay, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { Book } from './book';
import { tokenReference } from '@angular/compiler';
import { Observable } from 'rxjs';

@Component({
  selector: 'rxw-typeahead',
  templateUrl: './typeahead.component.html',
})
export class TypeaheadComponent {

  searchControl = new FormControl('');
  // results?: Book[];
  loading = false;
  results$: Observable<Book[]>;

  constructor(private ts: TypeaheadService) {
    const searchInput$ = this.searchControl.valueChanges;

    /******************************/

    this.results$ = searchInput$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter(term => term.length >= 3 || term.length === 0),
      tap(() => this.loading = true),
      switchMap(term => this.ts.search(term)),
      tap(() => this.loading = false),
    );// .subscribe(books => this.results = books);

    /*
    ## Anforderungen Typeahead-Suche
    - Suchbegriff mindestens 3 Zeichen lang
    - erst abschicken, wenn man für bestimmte Zeit lang die Finger stillhält
    - niemals zwei gleiche Begriffe direkt hinetreinander abschicken
    - Bücher auf dem Server suchen (this.ts.search(term))
    - Bücher anzeigen (Property this.results)
    - Extra: Umbauen mit AsyncPipe
    - Extra: Ladeindikator (this.loading)
    - Extra Extra: wenn man den Begriff komplett leer macht,
    bleiben die Ergebnisse trotzdem stehen... das ist ein Bug!
    */


    /******************************/
  }

  formatAuthors(authors: string[]) {
    return Array.isArray(authors) ? authors.join(', ') : '';
  }

}
