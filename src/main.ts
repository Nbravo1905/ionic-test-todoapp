import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  add,
  addCircle,
  briefcase,
  cart,
  checkmarkDoneCircle,
  clipboardOutline,
  close,
  ellipsisHorizontal,
  list,
  medical,
  person,
  trash,
  trashOutline,
} from 'ionicons/icons';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// Registrar iconos usados en la app (Ionic 8 requiere addIcons para que se muestren)
addIcons({
  add,
  addCircle,
  briefcase,
  cart,
  checkmarkDoneCircle,
  clipboardOutline,
  close,
  ellipsisHorizontal,
  list,
  medical,
  person,
  trash,
  trashOutline,
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
