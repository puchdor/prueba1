import { Component, Input } from '@angular2/core';

@Component({
  selector: 'points',
  template: `
    <h1>{{currentPoints}}</h1>
  `,
  styles: `
    h1 {
      width: 20em;
      height: 10em;
      background-color: #CFD2DC !important;
      color: white;
    }
  `
})
export class PointsComponent {
  @Input currentPoints : number;

  constructor(){

  }

}
