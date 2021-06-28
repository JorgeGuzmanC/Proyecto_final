import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioF } from '../../interfaces/usuario-f'
import Swal from 'sweetalert2';
import { ServiciosService } from '../../services/servicios.service';

@Component({
  selector: 'app-recuperar-contra',
  templateUrl: './recuperar-contra.component.html',
  styleUrls: ['./recuperar-contra.component.scss']
})
export class RecuperarContraComponent implements OnInit {

  submitted = false;
  formulario: FormGroup;
  usuario: UsuarioF;
  preguntas: String;
  respuesta: String;
  contrasenia: String;
  usuario1: UsuarioF;
  cont: number;

  constructor(public fb: FormBuilder, private servicio: ServiciosService) {
    this.formulario = fb.group({
      rut: ['', Validators.required],
      respuesta1: [''],
      respuesta2: ['']
    });
  }

  ngOnInit(): void {
    this.cont = 0;
  }

  get f() { return this.formulario.controls; }

  onSubmit() {
    this.submitted = true;
    this.cont++;
    let rut = this.formulario.get("rut").value;

    if (rut) {
      this.servicio.buscarUsuario(rut).subscribe(datos => {
        if (Object.keys(datos).length === 0) {                 // si el usuario no existe
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El usuario no se encuentra registrado',
          })
          this.cont--;
        } else {
          let respuesta = this.formulario.get("respuesta1").value;
          this.preguntas = datos[0].pregunta;
          this.respuesta = datos[0].respuesta;
          if(respuesta){
            this.servicio.validarRespuesta(datos[0].rut, respuesta).subscribe(datos1 => {
              if (Object.keys(datos1).length === 0) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'La respuesta no es correcta',
                })
                this.cont--;
              } else {
                if (datos[0].rut === datos1[0].rut) {
                  this.contrasenia = "1";
                  let contra = this.formulario.get("respuesta2").value;
                  if(!contra){
                    if(this.cont > 2){
                      Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ingresa una contraseña'
                      })
                    }
                  }
                  if (contra) {
                    this.servicio.cambiarContra(datos[0].rut, contra);
                    Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'La contraseña ha sido modificada correctamente',
                      showConfirmButton: false,
                      timer: 2000
                    })
                    setTimeout(function () { window.location.href = "/login"; }, 2000);
                  } 
                }
              }
            })
          }else{
            if(this.cont > 1){  
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ingresa una respuesta'
              })
              this.cont--;
            }
          }
        }
      });
    }
  }
}
