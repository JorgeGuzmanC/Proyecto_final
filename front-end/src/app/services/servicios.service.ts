import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  url='/api';
  constructor(private http: HttpClient) { }

  //get usuarios
  getUsuarios(){
    return this.http.get(this.url);
  }

  //agregar usuario
  addUsuario(usuario:any){
    return this.http.post(this.url, usuario);
  }

  buscarUsuario(rut:any){
    return this.http.get(`${this.url}/${rut}`);
  }

  validarRespuesta(rut:any,respuesta:any){
    return this.http.get(`${this.url}/recuperar/${rut}/${respuesta}`);
  }

  cambiarContra(rut:any , contra:any){
    return this.http.put(`${this.url}/cambiarContra/${rut}`,contra);
  }
}
