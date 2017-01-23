import {Component} from '@angular/core';
import { NavController,  NavParams } from 'ionic-angular';
import { MenuComponent } from '../../app/menu/menu.component';
import { ChampionSelectionPage } from '../champion-selection/champion-selection';

@Component({
  selector: 'start-page',
  templateUrl: 'start.html'
})
export class StartPage {
  menu : String;
  constructor(private navCtrl: NavController, private navParams: NavParams) {

  }

  onSelect(option: String) {
    console.log("opcion{" + option + "}")
    this.navCtrl.push(ChampionSelectionPage);
  }

}
