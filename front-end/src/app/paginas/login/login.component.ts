import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted = false;
  formulario: FormGroup;
  siteKey:string;
  NoRobot:boolean = false;
  
  constructor(public fb: FormBuilder, private servicio:LoginService) { 
    this.siteKey = '6LfGMjcbAAAAANCt64YxzMozJHRGN8S1_n3Kk7BH';
    this.formulario = fb.group({
      rut: ['', Validators.required],
      contra: ['', Validators.required],
      captcha: ['', Validators.required] 
    });
  }

  ngOnInit(): void {    
  }

  get f() {return this.formulario.controls;}

  onSubmit(){
    this.submitted = true;

    if(this.formulario.invalid){
      if(!this.NoRobot){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Complete el captcha antes de continuar',
        })
      }
      return 
    }
    
    this.servicio.validarLogin(this.formulario.get("rut").value, this.formulario.get("contra").value).subscribe(datos=>{
      if(datos.length != 0){
        if(datos[0].nombres === "admin"){
          localStorage.setItem('modoAdmin', JSON.stringify({"usuario":"Admin", "id":"0"}));
          this.redireccion();
          return;
        }
      }
      if(datos.length === 0){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El usuario no existe o los datos son incorrectos!'
          
        })
      }else{
        localStorage.setItem('sitiomovil', JSON.stringify({"usuario":datos[0].nombres, "id":datos[0].rut}));
        window.location.href="";
      }
    });
  }

  redireccion(){
    let datos = JSON.parse(localStorage.getItem('modoAdmin'));
    if(datos && datos.usuario){
        window.location.href="/homeAdmin";
    }
  }

  handleSuccess(evento:any){
    this.NoRobot = true;
  }
}

