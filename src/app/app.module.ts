import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

// Componentes
import { MyApp } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChampionComponent } from './champion/champion.component';
import { ChampionDetailComponent } from './champion/champion-detail.component';
import { MenuComponent } from './menu/menu.component';
import { GameComponent } from './game/game.component';
import { PointsComponent} from './game/points.component';

// Servicios
import { ChampionService } from './champion/champion.service';
import { GameService } from './game/game.service';

// Paginas
import { StartPage } from '../pages/start/start';
import { ChampionSelectionPage } from '../pages/champion-selection/champion-selection';
//import { LoadGamePage } from '../pages/load-game/load-game';
import { GamePage } from '../pages/game/game';

@NgModule({
  declarations: [
    MyApp,
    StartPage,
    ChampionSelectionPage,
    // LoadGamePage,
    GamePage,
    GameComponent,
    DashboardComponent,
    ChampionComponent,
    ChampionDetailComponent,
    MenuComponent,
    PointsComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
     MyApp,
     StartPage,
     ChampionSelectionPage,
     GamePage,
    // LoadGamePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ChampionService, GameService]
})
export class AppModule {}
