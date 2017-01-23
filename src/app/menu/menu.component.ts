import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'menu-component',
  template: `
    <div class="title">
      <h1><b>{{title}}</b></h1>
      <h2>{{subTitle}}</h2>
    </div>
    <button class="newGame" ion-button round (click)="menuOption(buttons[0])"> {{buttons[0]}} </button>
    <button class="loadGame" ion-button round (click)="menuOption(buttons[1])"> {{buttons[1]}} </button>
  `,
  styles: [`
    button {
      width: 300px;
      position: absolute;
    }
    .title {
      padding-top: 10%;
      padding-left: 27%;
      font-size: 30px;
      font-style: italic;
      font-family: fantasy;
    }

    h2 {
      padding-top: 1%;
      padding-left: 15%;
      font-size: 20px;
      font-style: italic;
      color: #600080
    }

    .newGame {
      margin-top: 10%;
      margin-left: 30%;
    }

    .loadGame{
      margin-top: 5%;
      margin-left: 30%;
    }
    `]
})
export class MenuComponent {
  @Output() onOption = new EventEmitter<String>();
  buttons : Array<String> = ["New Game", "Load Game"];
  title: string = "Crixo, Champion of Capua";
  subTitle: string = "A true champion tale";

  constructor(){

  }

  menuOption(option : String){
    for(let i=0; i === this.buttons.length; i++)
    {
      if(this.buttons[i] == option){
        this.onOption.emit(this.buttons[i]);
        //return this.buttons[i];
      }
    }
  }

}
