
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './data-model-heroes';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})



export class HeroService {


  getHeroes(): Observable<Hero[]> {
    return of(HEROES);
  }


  constructor(private messageService: MessageService) {
    
   }
}
