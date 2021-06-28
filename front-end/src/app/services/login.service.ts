import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url='/api';
  constructor(private http: HttpClient) { }

  //validacion del login
  validarLogin(rut:string, contra:string):Observable<any>{
    return this.http.get(`${this.url}/login/${rut}/${contra}`);
  }
}