import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  validar(): Boolean{
    let datos = JSON.parse(localStorage.getItem('sitiomovil'));
    if(datos && datos.usuario){
      return true;
    }
    return false;
  }

  validarAdmin():Boolean{
    let datos = JSON.parse(localStorage.getItem('modoAdmin'));
    if(datos && datos.usuario){
      return true;
    }
    return false;
  }

  cerrarSesion(){
    localStorage.clear();
  }

}

