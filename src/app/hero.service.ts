// Hero Service

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})



export class HeroService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  
  private heroesUrl = 'api/heroes'; 

  private log(message: string) {
    // sends messages from HeroService
    this.message.add('HeroService: ' + message);
  }

  
  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }


  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`Hero Service: fetched id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
}
