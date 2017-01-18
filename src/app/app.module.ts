import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StartPage } from '../pages/start/start';
import { CharacterSelectionPage } from '../pages/character-selection/character-selection'
import { LoadGamePage } from '../pages/load-game/load-game'
import { GamePage } from '../pages/game/game'

@NgModule({
  declarations: [
    MyApp,
    StartPage,
    CharacterSelectionPage,
    LoadGamePage,
    GamePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StartPage,
    CharacterSelectionPage,
    GamePage,
    LoadGamePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
