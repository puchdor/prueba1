import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

//ScreenOrientation.lockOrientation('landscape');
platformBrowserDynamic().bootstrapModule(AppModule);
