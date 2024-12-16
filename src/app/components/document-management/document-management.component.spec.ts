import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentManagementComponent } from './document-management.component';
import { SharedUtilsService } from 'src/app/services/shared-utils.service';
import { of, throwError } from 'rxjs';

describe('DocumentManagementComponent', () => {
  let component: DocumentManagementComponent;
  let fixture: ComponentFixture<DocumentManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentManagementComponent]
    });
    fixture = TestBed.createComponent(DocumentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
describe('DocumentManagementComponent', () => {
  let component: DocumentManagementComponent;
  let fixture: ComponentFixture<DocumentManagementComponent>;
  let sharedService: jasmine.SpyObj<SharedUtilsService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('SharedUtilsService', ['uploadFile']);

    TestBed.configureTestingModule({
      declarations: [DocumentManagementComponent],
      providers: [{ provide: SharedUtilsService, useValue: spy }]
    });
    fixture = TestBed.createComponent(DocumentManagementComponent);
    component = fixture.componentInstance;
    sharedService = TestBed.inject(SharedUtilsService) as jasmine.SpyObj<SharedUtilsService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLogin to true if localStorage has loggedIn-user as true', () => {
    spyOn(localStorage, 'getItem').and.returnValue('true');
    component.ngOnInit();
    expect(component.isLogin).toBeTrue();
  });

  it('should set isLogin to false if localStorage has loggedIn-user as false', () => {
    spyOn(localStorage, 'getItem').and.returnValue('false');
    component.ngOnInit();
    expect(component.isLogin).toBeFalse();
  });

  it('should set selectedFile when onFileSelected is called', () => {
    const event = { target: { files: [new File([], 'test-file.txt')] } };
    component.onFileSelected(event);
    expect(component.selectedFile).toEqual(event.target.files[0]);
  });

  it('should call uploadFile and push response to attachedFiles on successful upload', () => {
    const file = new File([], 'test-file.txt');
    const response = new File([], 'test-file.txt');
    component.selectedFile = file;
    sharedService.uploadFile.and.returnValue(of(response));

    component.onUpload();

    expect(sharedService.uploadFile).toHaveBeenCalledWith(file);
    expect(component.attachedFiles).toContain(response);
  });

  it('should alert "File uploaded successfully!" on successful upload', () => {
    spyOn(window, 'alert');
    const file = new File([], 'test-file.txt');
    const response = { name: 'test-file.txt' };
    component.selectedFile = file;
    sharedService.uploadFile.and.returnValue(of(response));

    component.onUpload();

    expect(window.alert).toHaveBeenCalledWith('File uploaded successfully!');
  });

  it('should alert "File upload failed!" on upload error', () => {
    spyOn(window, 'alert');
    const file = new File([], 'test-file.txt');
    component.selectedFile = file;
    sharedService.uploadFile.and.returnValue(throwError('error'));

    component.onUpload();

    expect(window.alert).toHaveBeenCalledWith('File upload failed!');
  });

  it('should alert "Please select a file first!" if no file is selected', () => {
    spyOn(window, 'alert');
    component.selectedFile = null;

    component.onUpload();

    expect(window.alert).toHaveBeenCalledWith('Please select a file first!');
  });
});
