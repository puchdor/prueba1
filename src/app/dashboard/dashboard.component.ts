import { Component } from '@angular/core';
import { Champion } from '../champion/champion';
import { ChampionService } from '../champion/champion.service';

@Component({
  //moduleId : module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {
  champions : Champion[] = [];

  constructor(private champServ: ChampionService) {

  }

  ngOnInit(): void {
    this.champServ.getChampions().then(champions => this.champions = champions.slice(1, 5));
  }
}
