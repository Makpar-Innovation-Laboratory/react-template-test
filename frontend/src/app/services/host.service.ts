import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HostService {

  constructor() { }

  // TODO: parameterize host based on environment.ts file, i.e.
  //        change host to dev, staging or prod based on environment.
  public getHost(){
    return environment.host
  }
}
