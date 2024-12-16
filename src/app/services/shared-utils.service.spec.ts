import { TestBed } from '@angular/core/testing';
import { SharedUtilsService } from './shared-utils.service';
import { of } from 'rxjs';

describe('SharedUtilsService', () => {
  let service: SharedUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return login status', () => {
    service['login'] = true;
    expect(service.userLogin).toBeTrue();

    service['login'] = false;
    expect(service.userLogin).toBeFalse();
  });

  it('should upload file and return it', (done) => {
    const file = new File([''], 'test-file.txt');
    service.uploadFile(file).subscribe((uploadedFile) => {
      expect(uploadedFile).toBe(file);
      done();
    });
  });
});
