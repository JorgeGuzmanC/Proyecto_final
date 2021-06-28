import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Citas } from 'src/app/interfaces/citas';
import { CitasService } from '../../services/citas.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {
  
  submitted = false;
  formulario: FormGroup;
  nuevaCita:Citas;

  constructor(public fb: FormBuilder, private citasService:CitasService, private router: Router) { 
    this.formulario = fb.group({
      motivo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    let datos = JSON.parse(localStorage.getItem('sitiomovil'));
    let datos2 = JSON.parse(localStorage.getItem('modoAdmin'));
    if(datos2 == null && datos == null){
      window.location.href="";
    } 
  }

  get f() {return this.formulario.controls;}

  onSubmit(){
    this.submitted = true;

    if(this.formulario.invalid){
      return 
    }
    
    let rut;
    let datos = JSON.parse(localStorage.getItem('sitiomovil'));
    if(datos && datos.usuario){
      rut = datos.id
    }
      
    this.nuevaCita={
      idcitas:0,
      paciente_Rut:rut,
      id_medico:14,
      motivo: this.formulario.get("motivo").value,
      descripcion: this.formulario.get("descripcion").value,
      estado: "abierto",
      fecha: "-",
      hora: "-"
    } 
    
    this.citasService.addCita(this.nuevaCita).subscribe();
    this.router.navigate(['/vista-citas']);
      
  }
}
