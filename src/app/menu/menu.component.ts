import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'menu-component',
  template: `
    <button class="option0" ion-button round (click)="menuOption(0)"> {{this.options[0]}} </button>
    <button class="option1" ion-button round (click)="menuOption(1)"> {{this.options[1]}} </button>
  `,
  styles: [`
    button {
      width: 300px;
      position: absolute;
    }

    .option0 {
      margin-top: 5%;
      margin-left: 25%;
    }

    .option1{
      margin-top: 15%;
      margin-left: 25%;
    }
    `]
})
export class MenuComponent {
  @Input() options : Array<string>;
  @Output() onOption = new EventEmitter<string>();

  constructor(){

  }

  menuOption(index : number){
    this.onOption.emit(this.options[index]);
  }

}
