import { Routes } from '@angular/router';
import { PokemonCarouselComponent } from './pokemon-carousel.component';

export const POKEMON_CAROUSEL_ROUTES: Routes = [
    {
      path: '',
      redirectTo: 'pokemon-search',
      pathMatch: 'full'
    },
    {
      path: 'pokemon-search',
      component: PokemonCarouselComponent
    }
];
