import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';

export class Element {
  id: number;
  name: string;
}

const LIST: Element[] = [
  { id: 11, name: 'Elemento 11'},
  { id: 12, name: 'Elemento 12'},
  { id: 13, name: 'Elemento 13'},
  { id: 14, name: 'Elemento 14'},
  { id: 15, name: 'Elemento 15'},
  { id: 16, name: 'Elemento 16'},
  { id: 17, name: 'Elemento 17'}
];

@Component({
  selector: 'page-home',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  title = 'Lista de elementos';
  list = LIST;
  selectedElement: Element;

  onSelect(element: Element): void {
    this.selectedElement = element;
    let greeter = new Greeter("world");
  }
  constructor(public navCtrl: NavController) {

  }
}

export class Greeter {
  greeting: string;
  constructor(message: string){
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}
