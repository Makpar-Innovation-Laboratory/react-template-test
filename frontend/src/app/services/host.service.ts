import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HostService {

  constructor() { }

  /**
   * Parse API host from *environment.ts* file.
   * @returns current backend API host
   */
  public getHost(){ return environment.host }
}
