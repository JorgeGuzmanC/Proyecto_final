import { Component, OnInit } from '@angular/core';
import { CitasService } from '../../services/citas.service'; 

@Component({
  selector: 'app-vista-citas',
  templateUrl: './vista-citas.component.html',
  styleUrls: ['./vista-citas.component.scss']
})
export class VistaCitasComponent implements OnInit {

  listaCitas2:any[];
  medicos: any[] = [""];
  especialidad: any[] = [""];

  constructor(private citasService:CitasService) { }

  ngOnInit(): void {
    let datos = JSON.parse(localStorage.getItem('sitiomovil'));
    let datos2 = JSON.parse(localStorage.getItem('modoAdmin'));
    if(datos2 == null && datos == null){
      window.location.href="";
    } 
    if(this.medicos){
      this.medicos.pop();
    }
    this.listarCitas();
  }

  listarCitas():any{
    let listaCitas:any[];
    let datos = JSON.parse(localStorage.getItem('sitiomovil'));
    if(datos && datos.usuario){
      listaCitas = this.obtenerCitas(listaCitas,datos);
    }
  }

  obtenerCitas(listaCitas:any[],datos:any):any{
    this.citasService.mostrarCitas(datos.id).subscribe(res=>{
      listaCitas=<any>res;
      listaCitas = this.obtenerMedico(listaCitas);
      setTimeout(() => this.listaCitas2 = listaCitas, 800);
    },
    err => console.log(err)
    );
  }

  obtenerMedico(array:any[]):any{
    let id;
    for(let i=0; i < array.length; i++){
      id = array[i].id_medico.toString();
      this.citasService.getMedico(id).subscribe(resp=>{
        array[i].id_medico = resp[0].nombre + " " + resp[0].apellidos;
        array[i].especialidad = resp[0].especialidad;
      },
      err => console.log(err) 
      )
    }
    return array;
  }
}

