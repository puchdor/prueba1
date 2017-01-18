import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { CharacterSelectionPage } from '../character-selection/character-selection'
import { LoadGamePage } from '../load-game/load-game'

@Component({
  selector: 'start-page',
  templateUrl: 'start.html'
})
export class StartPage {
  buttons: Array<string> = ["New Game", "Load Game"];
  title: string = "Crixo, Champion of Capua";
  subTitle: string = "The forgotten tale";
  constructor(private navCtrl: NavController) {

  }
  onNewGame(event) {
    this.navCtrl.push(CharacterSelectionPage);
  }

  onLoadGame(event) {
    this.navCtrl.push(LoadGamePage);
  }
}
