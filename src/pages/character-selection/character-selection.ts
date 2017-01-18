import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GamePage } from '../game/game'

/*
  Generated class for the CharacterSelection page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

const WEAPONS: Weapon[] = [
  { id: 1, name: "Sword", attack: 10, durability: 5 },
  { id: 2, name: "Fork", attack: 5, durability: 2 },
  { id: 3, name: "Axe", attack: 12, durability: 6 }
];

const CHAMPIONS: Champion[] = [
  { id: 1, name: "Crixo", lives: 5 , weapon: null},
  { id: 2, name: "Gannicus", lives: 3, weapon: null },
  { id: 3, name: "Spartacus", lives: 3, weapon: null },
  { id: 4, name: "Naevia", lives: 1, weapon: null}
];

export class Weapon {
  id: number;
  name: string;
  attack: number;
  durability: number;
}

export class Champion {
  id: number;
  name: string;
  lives: number;
  weapon: Weapon;
}

@Component({
  selector: 'page-character-selection',
  templateUrl: 'character-selection.html'
})
export class CharacterSelectionPage {
  champions = CHAMPIONS;
  weapons = WEAPONS;
  selectedChampion: Champion;
  selectedWeapon: Weapon;
  tHeader : Array<string> = ["Champion", "Weapon"];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  onSelectChampion(champion: Champion): void {
    this.selectedChampion = champion;
  }

  onSelectWeapon(weapon: Weapon): void {
    this.selectedWeapon = weapon;
  }

  onSelect(event): void {
    this.navCtrl.push(GamePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CharacterSelectionPage');
  }

}
