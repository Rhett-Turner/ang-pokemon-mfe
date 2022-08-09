import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PokemonCarouselComponent } from './pokemon-carousel/pokemon-carousel.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'pokemon-search',
        pathMatch: 'full'
      },
      {
        path: 'pokemon-search',
        component: PokemonCarouselComponent
      }
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
})
export class PokemonMfModule {}
