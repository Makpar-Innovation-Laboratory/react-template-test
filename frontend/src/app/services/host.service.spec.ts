import { TestBed } from '@angular/core/testing';

import { HostService } from './host.service';

import { environment } from 'src/environments/environment';

describe('HostService', () => {
  let service: HostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getHost should be mocked', () =>{
    expect(service.getHost()).toEqual('testhost')
  })
});
