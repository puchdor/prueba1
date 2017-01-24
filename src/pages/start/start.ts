import {Component} from '@angular/core';
import { NavController,  NavParams } from 'ionic-angular';
import { MenuComponent } from '../../app/menu/menu.component';
import { ChampionSelectionPage } from '../champion-selection/champion-selection';

@Component({
  selector: 'start-page',
  templateUrl: 'start.html'
})
export class StartPage {
  options : Array<string> = ["New Game", "Load Game"];

  title: string = "Crixo, Champion of Capua";
  subTitle: string = "A true champion tale";

  constructor(private navCtrl: NavController, private navParams: NavParams) {

  }

  onSelect(option: string) {
    if(option == this.options[0]) {
        this.navCtrl.push(ChampionSelectionPage);
    }
    else
    {
      console.log("Opcion no implementada");
    }
  }

}
