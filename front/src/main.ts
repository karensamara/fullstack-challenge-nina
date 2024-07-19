import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/pages/home/home.component';
// import { register as registerSwiperElements } from 'swiper/element';

// registerSwiperElements();
bootstrapApplication(HomeComponent, appConfig).catch((err) =>
  console.error(err)
);
