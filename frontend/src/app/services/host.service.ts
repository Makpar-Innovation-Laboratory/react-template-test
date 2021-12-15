import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HostService {

  constructor() { }

  // TODO: parameterize host based on environment.ts file, i.e.
  //        change host to dev, staging or prod based on environment.
  public getHost(){
    return 'https://api-innolab-dev.makpar-innovation.net'
  }
}
