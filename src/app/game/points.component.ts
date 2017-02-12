import { Component, ElementRef, OnInit } from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'points',
  template: ``,
  styles: [`
    .board {
      width: 10em;
      height: 3em;
      border-style: solid;
      border: 1px solid gray;
      background-color: #CFD2DC !important;
      color: white;
    }
  `]
})
export class PointsComponent implements OnInit {

  currentPoints: number;

  constructor(private el: ElementRef, private gameServ: GameService){
    gameServ.setPoints(0);
  }

  ngOnInit(){
    this.getPoints();
    this.drawPointBoard(this.el.nativeElement);
  }

  getPoints(): void {
    this.currentPoints = this.gameServ.getCurrentPoints();
    console.log(this.currentPoints);
  }

  drawPointBoard(el) : void {
    /// Inicializo servicio.
    var texto = document.createTextNode(String(this.currentPoints));
    var newEl = el.appendChild(texto);
  }
}



function elt(name, className) {
  var elt = document.createElement(name);
  if(className) elt.className = className;
  return elt;
}
