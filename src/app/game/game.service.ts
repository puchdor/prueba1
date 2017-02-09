import { Injectable } from '@angular/core';

@Injectable()
export class GameService {
  currentPoints : number;

  getPoints(): Promise<number> {
    return Promise.resolve(this.currentPoints);
  }

  setPoints(points) {
    this.currentPoints = points;
  }
}
