import { Injectable } from '@angular/core';

export enum ThemeMode{ light="light", dark="dark" }

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public theme: ThemeMode = ThemeMode.dark;

  constructor() { }

  public switchTheme(mode: ThemeMode){ this.theme = mode; }

  public isMode(mode: ThemeMode): boolean{ return this.theme == mode; }
}
