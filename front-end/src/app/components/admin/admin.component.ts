import { Component, OnInit } from '@angular/core';
import { CitasService } from '../../services/citas.service';
import { Router} from '@angular/router'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  listaCitas: any[];
  listaCitas2: any[];
  especialidad: any[] = [""];
  medicos: any[] = [""];
  buscadorEstado="";

  constructor(private citasService:CitasService, private router:Router) { }
  
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
    if(this.medicos){
      this.medicos.pop();
    }
    this.listarCitas();
  }

  listarCitas(){
    this.citasService.getCitas().subscribe(res=>{
      this.listaCitas = <any>res;
      let id;
      for(let i=0; i < this.listaCitas.length; i++){
        id = this.listaCitas[i].id_medico.toString();
        this.citasService.getMedico(id).subscribe(res=>{
          this.medicos[i] = res;
          this.listaCitas[i].id_medico = res[0].nombre + " " + res[0].apellidos;
          this.listaCitas[i].especialidad = res[0].especialidad;
        },
        err => console.log(err) 
        )
      }
      setTimeout(() => this.listaCitas2 = this.listaCitas, 800);
    },
    err => console.log(err) 
    )
  }

   // eliminar citas
  eliminar(id:number){                    
    Swal.fire({
      title: 'Estás seguro de eliminar?',
      text: "esta acción es irrevocable!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: "cancelar",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.citasService.deleteCita(id.toString()).subscribe(res=>{
            Swal.fire(
              'Borrado',
              'La cita ha sido borrada exitosamente.',
              'success'
            )
            this.listarCitas();
          },
          err=> console.log(err)
        );
      }
    })
  }

  modificar(id:number){
    this.router.navigate(['/edit/'+id]);
  }
  
}