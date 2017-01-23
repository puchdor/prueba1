import { Injectable } from '@angular/core';
import { Champion, Weapon } from './champion';
import { CHAMPIONS } from './mock-champions';
import { WEAPONS } from './mock-weapons';

@Injectable()
export class ChampionService {

  selectedChampion: Champion;

  setChampion(champion) {
    this.selectedChampion = champion;
  }
  getChampion(): Promise<Champion> {
    return Promise.resolve(this.selectedChampion);
  }

  getChampions(): Promise<Champion[]> {
    return Promise.resolve(CHAMPIONS);
  }
  getWeapons(): Promise<Weapon[]> {
    return Promise.resolve(WEAPONS);
  }
  getChampionsSlowly(): Promise<Champion[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 seconds delay
      setTimeout(() => resolve(this.getChampions()), 2000);
    })
  }

}
