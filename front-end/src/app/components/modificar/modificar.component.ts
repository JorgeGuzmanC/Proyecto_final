import { Component, OnInit } from '@angular/core';
import { CitasService } from '../../services/citas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Citas } from '../../interfaces/citas';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent implements OnInit {
  submitted = false;
  formulario: FormGroup;
  cita: Citas={
    idcitas: 0,
          paciente_Rut: "",
          id_medico: 14,
          motivo: "",
          descripcion: "",
          estado: "",
          fecha: "",
          hora: ""
  };
  id;
  
  constructor(public fb: FormBuilder, private citasService:CitasService, private router: Router, private activeRoute:ActivatedRoute) { 
    this.formulario = fb.group({
      idcitas: 0,
      pacienteRut: ['', Validators.required],
      idmedicos: 14,
      motivo: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
    });
  }

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
    const id_entrada = <string>this.activeRoute.snapshot.params.id;

    if(id_entrada){
      this.citasService.mostrarCitasId(id_entrada).subscribe(res=>{
        this.id = res[0].idcitas;
        this.cita = res[0];
      },
      err => console.log(err)
      )
    }

  }

  get f() {return this.formulario.controls;}

  modificar(){
    this.submitted = true;

    if(this.formulario.invalid){
      return
    }

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cita editada con éxito',
      showConfirmButton: false,
      timer: 3000
    })
  
    this.cita={
      idcitas: Number(this.id),
      paciente_Rut: this.formulario.get("pacienteRut").value,
      id_medico: this.formulario.get("idmedicos").value,
      motivo: this.formulario.get("motivo").value,
      descripcion: this.formulario.get("descripcion").value,
      estado: this.formulario.get("estado").value,
      fecha: this.formulario.get("fecha").value,
      hora: this.formulario.get("hora").value
    }
    
    this.citasService.editCita(this.id,this.cita).subscribe();
    this.router.navigate(['/admin_citas']);

  }
}
