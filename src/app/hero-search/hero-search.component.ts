import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged,
            switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})



export class HeroSearchComponent implements OnInit {

  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<String>();

  constructor(private heroService: HeroService) { }

  // push a search term into the observable stream
  search(term: String): void {
    this.searchTerms.next(term);
  }


  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300 ms after each keystroke before 
      // considering the term
      debounceTime(300),

      // ignore new term if same as previous one
      distinctUntilChanged(),

      // switch to a new search obervable every time 
      // the term changes
      switchMap((term: String) => this.heroService.searchHeroes(term)),
    );
  }
}
