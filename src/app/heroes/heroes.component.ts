// HeroesComponent

import { Component, OnInit } from '@angular/core';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})


export class HeroesComponent implements OnInit {


  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  // Public Methods
  add(name: string): void {
    name: name.trim();
    if ( !name ) { return; }
    // addHero() method is passed new 'hero' object
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero)
      });
  }


  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }


  ngOnInit() {
    this.getHeroes();
  }
}
