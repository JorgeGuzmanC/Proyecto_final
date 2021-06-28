import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service'
import { UsuarioF } from '../../interfaces/usuario-f'

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.scss']
})
export class VerUsuariosComponent implements OnInit {

  listaUsuarios: UsuarioF[];

  constructor(private ServiciosService: ServiciosService) { }

  ngOnInit(): void {
    let datos = JSON.parse(localStorage.getItem('sitiomovil'));
    if(datos && datos.usuario){
      window.location.href="";
      return;
    } 
    let datos2 = JSON.parse(localStorage.getItem('modoAdmin'));
    if(datos2 == null && datos == null){
      window.location.href="";
      return;
    } 
    this.listarUsuarios();
  }


  listarUsuarios(){
    this.ServiciosService.getUsuarios().subscribe(res=>{
      this.listaUsuarios = <any>res;
      for(let i=0;i<this.listaUsuarios.length;i++){
        if(this.listaUsuarios[i].rut  == "00000000-0"){
        this.listaUsuarios.splice(i,1);
        }
      }
    },
    err => console.log(err)
    );
  }
}
