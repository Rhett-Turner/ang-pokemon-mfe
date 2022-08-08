import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';

import { AppComponent } from './app.component';
import { ExtensionHostComponent } from './extension-host/extension-host.component';

@NgModule({
  declarations: [AppComponent, ExtensionHostComponent],
  imports: [
    BrowserModule,
    FormsModule,
    PanelModule,
    ButtonModule,
    BrowserAnimationsModule,
    CarouselModule,
    InputTextModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
