import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TemperatureComponent } from './sensors/temperature/temperature.component';
import { PressureComponent } from './sensors/pressure/pressure.component';

@NgModule({
  declarations: [
    AppComponent,
    TemperatureComponent,
    PressureComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
