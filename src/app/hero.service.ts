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
  private log(message: string) {
    // sends messages from HeroService
    this.messageService.add('HeroService: ' + message);
  }

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
  // add a hero object to the server
  addHero(hero: Hero): Observable<Hero> {
    // post a 'new' hero object
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap((hero: Hero) => this.log(`added a hero with id=${hero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }


  getHeroes(): Observable<Hero[]> {
    // retrieve all Heroes
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
      );
  }


  getHero(id: number): Observable<Hero> {
    // retrieve Hero's Detail
    const url = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id= ${id}`))
      );
  }


  updateHero(hero: Hero): Observable<any> {
    // save an updated Hero object
    return this.http.put(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updatedHero'))
      );
  }
}
