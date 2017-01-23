import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ChampionService } from './champion.service';
import { Champion } from './champion';

@Component({
  selector: 'champion-detail',
  template: `
    <div *ngIf="champion">
      <h2>{{champion.name}}</h2>
      <p> Ave {{ masterName }}, we who are about to die, salute you!</p>
      <h4>Lives: {{champion.lives}}</h4>
      <h4 *ngIf="champion.weapon">Weapon: {{champion.weapon.name}}</h4>
    </div>
  `,
  styles: [`
    div {
      background-color: #CFD8DC !important;
      left: 1em;
      text-align: center;
      width: 12em;
    }
  `]
})
export class ChampionDetailComponent {
  @Input() champion: Champion;
  @Input('master') masterName: string;

  constructor(
    private champServ: ChampionService,
    private location: Location
  ){}
}
