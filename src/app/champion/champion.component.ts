import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Champion, Weapon } from './champion';
import { ChampionService } from './champion.service';
// import { ChampionDetailComponent } from './champion-detail.component';

@Component({
  selector: 'my-champion',
  template: `
  <table>
    <tr>
      <td>
        <ul class="champion">
          <li class="menuHeader">{{menuHeader[0]}}</li>
          <li class="menu" *ngFor="let champion of champions" [class.selected]="champion === selectedChampion" (click)="onSelectChampion(champion)">
            <span class="badge">{{champion.id}}</span> {{champion.name}}
          </li>
        </ul>
      </td>
      <td>
        <champion-detail [champion]="selectedChampion" [master]="master"></champion-detail>
      </td>
    </tr>
    <tr>
      <td>
          <ul class="champion">
            <li class="menuHeader">{{menuHeader[1]}}</li>
            <div *ngIf="selectedChampion">
              <li class="menu" *ngFor="let weapon of weapons" [class.selected]="weapon === selectedWeapon" (click)="onSelectWeapon(weapon)">
                <span class="badge">{{weapon.id}}</span> {{weapon.name}}
              </li>
            </div>
          </ul>
      </td>
      <td>
        <div *ngIf="selectedChampion && selectedWeapon">
          <button ion-button round (click)="onContinue()">Continue</button>
        </div>
      </td>
    </tr>
  </table>
  `,
  styles: [`
    ul {
      background-color: #CFD2DC !important;
      color: #002633;
    }

    .continue {
      background-color: #CFD8DC !important;
      border-radius: 25px;
      width: 5em;
    }

    .menuHeader {
      background-color: #CFD8DC !important;
      left: 4em;
      text-align: center;
      width: 7em;

    }

    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }

    .champion {
      margin: 0 2em 0 2em;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }

    .champion .menu {
      cursor: pointer;
      position: relative;
      left: 10;
      background-color: #EEE;
      margin: 0.5em;
      padding: 0.3em 0;
      height: 1.7em;
      border-radius: 4px;
    }

    .champion .menu.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }

    .champion .menu:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .champion .text {
      position: relative;
      top: -3px;
    }

    .champion .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.3em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -5px;
      height: 2em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
    `]
})
export class ChampionComponent implements OnInit {
  @Output() onSelect = new EventEmitter<Champion>();
  menuHeader: Array<string> = ["Champion", "Weapon"];
  weapons: Weapon[];
  champions: Champion[];
  selectedChampion: Champion;
  selectedWeapon: Weapon;
  master: string = 'Cesar';

  constructor(private champServ: ChampionService) {

  }

  ngOnInit(): void {
    this.getChampions();
    this.getWeapons();
    console.log(this.champions);
  }

  getChampions(): void {
    this.champServ.getChampions().then(champions => this.champions = champions);
  }

  getWeapons(): void {
    this.champServ.getWeapons().then(weapons => this.weapons = weapons);
  }

  onSelectChampion(champion: Champion): void {
    this.selectedChampion = champion;
    this.selectedWeapon = null;
  }

  onSelectWeapon(weapon: Weapon): void {
    this.selectedWeapon = weapon;
    this.selectedChampion.weapon = this.selectedWeapon;
  }

  onContinue(): void {
    this.onSelect.emit(this.selectedChampion);
  }

}
