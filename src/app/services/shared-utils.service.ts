import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedUtilsService {
  private login: boolean = false;
  constructor(private http: HttpClient) { }

  set userLogin(value: boolean) {
    this.login = value;
    console.log('login', this.login);
  }

  get userLogin(): boolean {
    console.log('login11', this.login);
    return this.login;
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return of(file);
  }
}
