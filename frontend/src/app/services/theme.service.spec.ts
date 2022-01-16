import { TestBed } from '@angular/core/testing';

import { ThemeMode, ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start in dark mode', ()=>{
    expect(service.isMode(ThemeMode.dark)).toBeTrue();
  })

  it('should toggle modes', ()=>{
    service.switchTheme(ThemeMode.light)
    expect(service.isMode(ThemeMode.light)).toBeTrue();
  })
});
