// Hero Service

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, ObservableInput } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})



export class HeroService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    
  private heroesUrl = 'api/heroes'; 
  
  // Private Methods
  // 
  // message logging
  private log(message: string) {
    // sends messages from HeroService
    this.messageService.add('HeroService: ' + message);
  }
  //  error handler
  private handleError<T> (operation = 'operation', result?: T) {
    // handles any errors retrieving Hero data over HTTP
    return (error: any): Observable<T> => {
      // log to console
      console.error(error);
      // error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result
      return of(result as T);
    } 
  }


  // Public Methods
  // 
  // POST 'hero' object to server
  addHero(hero: Hero): Observable<Hero> {
    // post a 'new' hero object
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap((hero: Hero) => this.log(`added a hero with id=${hero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }
  // DELETE 'hero' object from server
  deleteHero(hero: Hero | number): Observable<Hero> {
    // remove a hero
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return  this.http.delete<Hero>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      )
  }
  // GET 'heroes' object
  getHeroes(): Observable<Hero[]> {
    // retrieve all heroes
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
      );
  }
  // GET a 'hero' object by 'id'
  getHero(id: number): Observable<Hero> {
    // retrieve hero's Detail
    const url = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id= ${id}`))
      );
  }
  // PUT an update to a 'hero' object
  updateHero(hero: Hero): Observable<any> {
    // save a hero
    return this.http.put(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updatedHero'))
      );
  }

  searchHeroes(term: String): Observable<Hero[]> {
     // if not a search term, return empty array
    if (!term.trim()) { return of([]) }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(_ => this.log(`found heroes matching term "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  } 
}
