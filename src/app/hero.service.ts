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
    private messageService: MessageService) { }

  
  private heroesUrl = 'api/heroes'; 

  private log(message: string) {
    // sends messages from HeroService
    this.messageService.add('HeroService: ' + message);
  }



  getHeroes(): Observable<Hero[]> {

    // TODO: send the message _after_ fetching the heroes
    return this.http.get<Hero[]>(this.heroesUrl)
  }


  // getHero(id: number): Observable<Hero> {

  //   // TODO: send the message _after_ fetching the hero
  //   this.messageService.add(`Hero Service: fetched id=${id}`);
  //   return of(HEROES.find(hero => hero.id === id));
  // }
}
