import { loadRemoteModule } from '@angular-architects/module-federation';
import {
  WebComponentWrapper,
  WebComponentWrapperOptions,
} from '@angular-architects/module-federation-tools';
import { Routes } from '@angular/router';
import { ExtensionManifest } from './app.component';
import { HomeComponent } from './home/home.component';

const s3Host =
  'http://module-federation-extensions.s3-website-us-east-1.amazonaws.com/';

const searchManifest: ExtensionManifest = {
  extensionPath: 'pokemon-search',
  remoteName: 'search',
  exposedModule: './Module',
  extensionModuleName: 'PokemonCarouselComponent',
};

const userCardManifest: ExtensionManifest = {
  extensionPath: 'userCard',
  remoteName: 'userCard',
  exposedModule: './userCard.js',
  extensionModuleName: 'userCard',
};

export const APP_ROUTES: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'pokemon-2',
    loadChildren: () => import('@ang-pokemon-mfe/pokemon-mf').then(m => m.PokemonCarouselModule)
  },
  // Your route here:

  // {
  //   path: 'pokemon-search',
  //   loadChildren: () => {
  //     return loadRemoteModule({
  //       remoteEntry: `${s3Host}${searchManifest.extensionPath}/remoteEntry.js`,
  //       remoteName: searchManifest.remoteName,
  //       exposedModule: searchManifest.exposedModule,
  //     }).then(m => m.PokemonCarouselModule);}
  // },
  {
    path: 'userCard',
    component: WebComponentWrapper,
    data: {
      remoteEntry: `${s3Host}${userCardManifest.extensionPath}/remoteEntry.js`,
      remoteName: userCardManifest.remoteName,
      exposedModule: userCardManifest.exposedModule,
      elementName: 'user-card',
    } as WebComponentWrapperOptions,

  },
  {
    path: 'react',
    component: WebComponentWrapper,
    data: {
      remoteEntry: `https://witty-wave-0a695f710.azurestaticapps.net/remoteEntry.js`,
      remoteName: 'react',
      exposedModule: './web-components',
      elementName: 'react-element',
    } as WebComponentWrapperOptions,
  },


  // DO NOT insert routes after this one.
  // { path:'**', ...} needs to be the LAST one.
];
