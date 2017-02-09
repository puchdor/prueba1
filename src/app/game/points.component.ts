import { Component, Input, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'points',
  template: `<div class="board">ho</div>
  `,
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
  @Input() currentPoints : number;

  constructor(private el: ElementRef){

  }

  ngOnInit(){
    pointBoard(this.el.nativeElement);
  }

}

function pointBoard(element) {
  /// Inicializo servicio.
  var newEl = element.appendChild("div", "currentPoints")
}

function elt(name, className) {
  var elt = document.createElement(name);
  if(className) elt.className = className;
  return elt;
}
