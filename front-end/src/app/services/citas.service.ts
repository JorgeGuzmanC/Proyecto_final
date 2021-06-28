import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  url='/api';
  constructor(private http: HttpClient) { }

  mostrarCitas(rut:string):Observable<any>{
    return this.http.get(`${this.url}/citas/${rut}`);
  }

  mostrarCitasId(id:string):Observable<any>{
    return this.http.get(`${this.url}/citas/id/${id}`);
  }

  getCitas(){
    return this.http.get(`${this.url}/citas/lista`);
  }

  addCita(cita:any){
    return this.http.post(`${this.url}/citas`, cita);
  }

  deleteCita(id:string){
    return this.http.delete(`${this.url}/citas/${id}`);
  }

  editCita(id:string, cita:any){
    return this.http.put(`${this.url}/citas/${id}`, cita);
  }

  getMedico(id:any){
    return this.http.get(`${this.url}/medico/${id}`);
  }
  
}


