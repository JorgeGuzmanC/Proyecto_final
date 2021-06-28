import { Component, OnInit } from '@angular/core';
import { CitasService } from '../../services/citas.service';
import { Router } from '@angular/router';
import { Citas } from '../../interfaces/citas';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {

  submitted = false;
  formulario: FormGroup;
  newCita: Citas;

  constructor(public fb: FormBuilder, private citasService:CitasService, private router: Router) { 
    this.formulario = fb.group({
      idcitas: 0,
      pacienteRut: ['', Validators.required],
      idmedicos: ['',Validators.required],
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
  }

  get f() {return this.formulario.controls;}

  agregar(){
    this.submitted = true;

    if(this.formulario.invalid){
      return
    }

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cita registrada con éxito',
      showConfirmButton: false,
      timer: 3000
    })
  
    this.newCita={
      idcitas: 0,
      paciente_Rut: this.formulario.get("pacienteRut").value,
      id_medico: this.formulario.get("idmedicos").value,
      motivo: this.formulario.get("motivo").value,
      descripcion: this.formulario.get("descripcion").value,
      estado: this.formulario.get("estado").value,
      fecha: this.formulario.get("fecha").value,
      hora: this.formulario.get("hora").value
    }

    this.citasService.addCita(this.newCita).subscribe();
    this.router.navigate(['/admin_citas']);
  }
}
