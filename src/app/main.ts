import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ScreenOrientation } from 'ionic-native';
import { AppModule } from './app.module';

//ScreenOrientation.lockOrientation('landscape');
platformBrowserDynamic().bootstrapModule(AppModule);
