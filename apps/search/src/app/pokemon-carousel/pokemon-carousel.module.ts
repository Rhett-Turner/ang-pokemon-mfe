import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonCarouselComponent } from './pokemon-carousel.component';
import { RouterModule } from '@angular/router';
import { POKEMON_CAROUSEL_ROUTES } from './pokemon-carousel.routes';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PanelModule,
    ButtonModule,
    CarouselModule,
    InputTextModule,
    RouterModule.forChild(POKEMON_CAROUSEL_ROUTES),
  ],
  declarations: [
    PokemonCarouselComponent
  ],
  exports: [PokemonCarouselComponent]
})
export class PokemonCarouselModule { }
