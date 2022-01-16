import { TestBed, waitForAsync } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { HostService } from './host.service';

describe('HostService', () => {
  let service: HostService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({});
  }));

  beforeEach(()=>{
    service = TestBed.inject(HostService);
  })
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should pull host from environment file', () =>{
    expect(service.getHost()).toEqual(environment.host)
  })
});
