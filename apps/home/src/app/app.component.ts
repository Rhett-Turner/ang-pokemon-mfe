import { Component, OnInit } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { Route, Router } from '@angular/router';
import { WebComponentWrapper, WebComponentWrapperOptions } from '@angular-architects/module-federation-tools';

export interface ExtensionManifest {
  extensionPath: string;
  remoteName: string;
  exposedModule: string;
  extensionModuleName?: string;
  extensionElementName?: string;
}

declare let AWS: any;

const bucketName = 'module-federation-extensions';
const bucketRegion = 'us-east-1';
const IdentityPoolId = 'us-east-1:6b6dbac9-aed8-4ef7-bc5f-c6e441c0f3e0';

console.log(AWS);

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId,
  }),
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: bucketName },
});

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


@Component({
  selector: 'ang-pokemon-mfe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  extensionList: any[] = [];
  manifest?: any;

  extensionPath?: string;
  extensionRoutes: string[] = [
    'home',
    'react'
  ];

  // item: WebComponentWrapperOptions = {
  //   remoteEntry: `${s3Host}${userCardManifest.extensionPath}/remoteEntry.js`,
  //   remoteName: userCardManifest.remoteName,
  //   exposedModule: userCardManifest.exposedModule,
  //   elementName: 'user-card',
  // };
  
  // props = {
  //   "email": "rhett.turner37@gmail.com"
  // };

  constructor(private router: Router) {}

  async loadExtension(manifest: ExtensionManifest = searchManifest) {
    const { [`${manifest.extensionModuleName}`]: extension } =
      await loadRemoteModule({
        remoteEntry: `${s3Host}${manifest.extensionPath}/remoteEntry.js`,
        remoteName: manifest.remoteName,
        exposedModule: manifest.exposedModule,
      });
    this.extensionList?.push(extension);
  }

  async loadCardExtension(manifest: ExtensionManifest = userCardManifest) {
    const data = await loadRemoteModule({
      remoteEntry: `${s3Host}${manifest.extensionPath}/remoteEntry.js`,
      remoteName: manifest.remoteName,
      exposedModule: manifest.exposedModule,
    });
    console.log(data);
    const extensionn = window.customElements.get('user-card');
    if (extensionn) {
      const userCardElement: any = document.createElement('user-card');
      userCardElement['visible'] = true;
      document.body.appendChild(userCardElement);
    }
  }

  ngOnInit() {
    const params = {
      Bucket: bucketName,
      Key: `mf.manifest.json`,
    };

    s3.getObject(params, (err: any, data: any) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        const manifest = data.Body.toString('utf-8');
        this.manifest = JSON.parse(manifest);
        console.log(this.manifest);

        this.manifest.extensions.forEach(
          (extensionManifest: ExtensionManifest) => {
            let newExtensionRoute: Route = {};
            if (extensionManifest.extensionModuleName) {
              newExtensionRoute = {
                path: extensionManifest.extensionPath,
                loadChildren: () => {
                  return loadRemoteModule({
                    remoteEntry: `${s3Host}${extensionManifest.extensionPath}/remoteEntry.js`,
                    remoteName: extensionManifest.remoteName,
                    exposedModule: extensionManifest.exposedModule,
                  }).then(m => m[extensionManifest.extensionModuleName ?? '']);}
              };
            } else if (extensionManifest.extensionElementName) {
              newExtensionRoute = {
                path: extensionManifest.extensionPath,
                component: WebComponentWrapper,
                data: {
                  remoteEntry: `${s3Host}${extensionManifest.extensionPath}/remoteEntry.js`,
                  remoteName: extensionManifest.remoteName,
                  exposedModule: extensionManifest.exposedModule,
                  elementName: extensionManifest.extensionElementName,
                } as WebComponentWrapperOptions,
              };
            } else {
              console.log("no module or element name found");
            }
            //this.loadExtension(extensionManifest);
            this.router.config.push(newExtensionRoute);
            this.extensionRoutes.push(extensionManifest.extensionPath);
          }
        );
      }
    });
  }

  s3upload(event: any) {
    const files = event.target.files;
    if (files && this.extensionPath) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = file.name;
        const filePath = `${this.extensionPath}/` + fileName;
        console.log(fileName);

        s3.upload(
          {
            Key: filePath,
            Body: file,
          },
          function (err: any, data: any) {
            if (err) {
              console.log(`error: ${err}`);
            }
          }
        );
      }
    }
  }

  setUploadPath(event :any) {
    this.extensionPath = event.target.value;
  }
}
