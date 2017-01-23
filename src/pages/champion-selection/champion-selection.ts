import { Component, SimpleChange } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChampionComponent } from '../../app/champion/champion.component';
import { Champion } from '../../app/champion/champion';
import { StartPage } from '../start/start';
/*
  Generated class for the ChampionSelection page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-champion-selection',
  templateUrl: 'champion-selection.html'
})
export class ChampionSelectionPage {
  champion : Champion;
  constructor(public navCtrl: NavController, public navParams: NavParams){
    this.champion = null;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChampionSelectionPage');
  }

  ngOnChanges(change: SimpleChange) {
    console.log(change.previousValue);
    console.log(change.currentValue);
  }

  onSelect(champion: Champion) {
    this.champion = champion;
    this.navCtrl.push(StartPage);
  }


}
