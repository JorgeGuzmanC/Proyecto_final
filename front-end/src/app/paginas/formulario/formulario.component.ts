import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiciosService } from '../../services/servicios.service';
import { Router } from '@angular/router';
import {UsuarioF} from '../../interfaces/usuario-f';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  title = 'select-dependientes';
  newUsuario: UsuarioF;
  ciudades = [];
  regionSeleccionada = "";
  ciudadSeleccionada = "";
  submitted = false;
  formulario: FormGroup;
  siteKey:string;
  NoRobot:boolean = false;

  constructor(public fb: FormBuilder, private ServicioService: ServiciosService, private router: Router) {
    this.siteKey = '6LfGMjcbAAAAANCt64YxzMozJHRGN8S1_n3Kk7BH';
    this.formulario = fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: ['',Validators.required],
      rut: ['', Validators.required],
      regionSeleccionada: ['', Validators.required],
      ciudadSeleccionada: ['', Validators.required],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      contra: ['', Validators.required],
      ccontra: ['', Validators.required],
      pregunta: ['', Validators.required],
      respuesta: ['', Validators.required],
      captcha: ['', Validators.required] 
    });
  }

  ngOnInit(): void {
  }

  onChange(nuevaRegion) {
    this.ciudades = this.regiones.find(x => x.region === nuevaRegion).ciudades;
    this.regionSeleccionada = nuevaRegion;
  }

  onChangeC(nuevaComuna) {
    this.ciudadSeleccionada = nuevaComuna;
  }

  get f() {return this.formulario.controls;}

  onSubmit(){
    this.submitted = true;
    let contraa = this.formulario.get("contra").value;
    let ccontraa = this.formulario.get("ccontra").value;
    
    if (contraa != ccontraa){
      this.formulario.get('ccontra').setErrors({'incorrect': true});
      return
    }
    
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

    this.newUsuario={
      nombres:this.formulario.get("nombre").value,
      apellidos:this.formulario.get("apellidos").value,
      rut:this.formulario.get("rut").value,
      direccion:this.formulario.get("direccion").value,
      region:this.regionSeleccionada,
      comuna:this.ciudadSeleccionada,
      correo:this.formulario.get("correo").value,
      contrase??a:this.formulario.get("contra").value,
      pregunta: this.formulario.get("pregunta").value,
      respuesta: this.formulario.get("respuesta").value
    }
    
    this.ServicioService.addUsuario(this.newUsuario).subscribe();

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Usuario creado con ??xito',
      showConfirmButton: false,
      timer: 4000
    })
    this.router.navigate(['']);
  }

  handleSuccess(evento:any){
    this.NoRobot = true;
  }

  regiones = [
    {
      "region": "Tarapac??",
      "ciudades": ["Cami??a", "Pozo Almonte", "Iquique", "Alto Hospicio", "Colchane", "Huara", "Pica"]
    },
    {
      "region": "Antofagasta",
      "ciudades": ["Mar??a Elena", "Mejillones", "Antofagasta,", "Tocopilla", "Ollague", "San Pedro de Atacama", "Sierra gorda", "Calama", "Taltal"]
    },
    {
      "region": "Atacama",
      "ciudades": ["Cha??aral","Diego de Almagro","Caldera","Copiap??","Tierra Amarilla","Alto del Carmen","Freirina","Huasco","Vallenar"]
    },

    {
      "region": "Coquimbo",
      "ciudades": ["Canela","Illapel","Los Vilos","Salamanca","Andacollo","Coquimbo","La Higuera","La Serena","Paihuano","Vicu??a","Combarbal??","Monte Patria","Ovalle","Punitaqui","R??o Hurtado"]
    },

    {
      "region": "Valpara??so",
      "ciudades": ["Isla de Pascua","Calle Larga","Los Andes","Rinconada","San Esteban","Cabildo","La Ligua","Papudo","Petorca","Zapallar","Hijuelas","La Calera","La Cruz","Nogales","Quillota","Algarrobo","Cartagena","El Quisco","El Tabo","San Antonio","Santo Domingo","Catemu","Llay-Llay","Panquehue","Putaendo","San Felipe","Santa Mar??a","Casablanca","Conc??n","Juan Fern??ndez","Puchuncav??","Quintero","Valpara??so","Vi??a del Mar","Limache","Olmu??","Quilpu??","Villa Alemana"]
    },

    {
      "region": "Regi??n Metropolitana",
      "ciudades": ["Colina","Lampa","Til Til","Pirque","Puente Alto","San Jos?? de Maipo","Buin","Calera de Tango","Paine","San Bernardo","Alhu??","Curacav??","Mar??a Pinto","Melipilla","San Pedro","Cerrillos","Cerro Navia","Conchal??","El Bosque","Estaci??n Central","Huechuraba","Independencia","La Cisterna","La Granja","La Florida","La Pintana","La Reina","Las Condes","Lo Barnechea","Lo Espejo","Lo Prado","Macul","Maip??","??u??oa","Pedro Aguirre Cerda","Pe??alol??n","Providencia","Pudahuel","Quilicura","Quinta Normal","Recoleta","Renca","San Miguel","San Joaqu??n","San Ram??n","Santiago","Vitacura","El Monte","Isla de Maipo","Padre Hurtado","Pe??aflor","Talagante"]
    },

    {
      "region": "Del Libertador General Bernardo Ohiggins",
      "ciudades": ["Codegua","Coinco","Coltauco","Do??ihue","Graneros","Las Cabras","Machal??","Malloa","Mostazal","Olivar","Peumo","Pichidegua","Quinta de Tilcoco","Rancagua","Rengo","Requ??noa","San Vicente de Tagua Tagua","Litueche","Marchig??e","Navidad","Paredones","Pichilemu","Ch??pica","Chimbarongo","Lolol","Nancagua","Palmilla","Peralillo","Placilla","Pumanque","San Fernando","Santa Cruz"]
    },

    {
      "region": "Del Maule",
      "ciudades": ["Cauquenes","Chanco","Pelluhue","Curic??","Huala????","Licant??n","Molina","Rauco","Romeral","Sagrada Familia","Teno","Vichuqu??n","Colb??n","Linares","Longav??","Parral","Retiro","San Javier","Villa Alegre","Yerbas Buenas","Constituci??n","Curepto","Empedrado","Maule","Pelarco","Pencahue","R??o Claro","San Clemente","San Rafael","Talca"]
    },

    {
      "region": "Del Biob??o",
      "ciudades": ["Arauco","Ca??ete","Contulmo","Curanilahue","Lebu","Los ??lamos","Tir??a","Alto Biob??o","Antuco","Cabrero","Laja","Los ??ngeles","Mulch??n","Nacimiento","Negrete","Quilaco","Quilleco","San Rosendo","Santa B??rbara","Tucapel","Yumbel","Chiguayante","Concepci??n","Coronel","Florida","Hualp??n","Hualqui","Lota","Penco","San Pedro de la Paz","Santa Juana","Talcahuano","Tom??"]
    },

    {
      "region": "De la Araucan??a",
      "ciudades": ["Carahue","Cholchol","Cunco","Curarrehue","Freire","Galvarino","Gorbea","Lautaro","Loncoche","Melipeuco","Nueva Imperial","Padre Las Casas","Perquenco","Pitrufqu??n","Puc??n","Puerto Saavedra","Temuco","Teodoro Schmidt","Tolt??n","Vilc??n","Villarrica","Angol","Collipulli","Curacaut??n","Ercilla","Lonquimay","Los Sauces","Lumaco","Pur??n","Renaico","Traigu??n","Victoria",]
    },

    {
      "region": "De los lagos",
      "ciudades": ["Ancud","Castro","Chonchi","Curaco de V??lez","Dalcahue","Puqueld??n","Queil??n","Quemchi","Quell??n","Quinchao","Calbuco","Cocham??","Fresia","Frutillar","Llanquihue","Los Muermos","Maull??n","Puerto Montt","Puerto Varas","Osorno","Puerto Octay","Purranque","Puyehue","R??o Negro","San Juan de la Costa","San Pablo","Chait??n","Futaleuf??","Hualaihu??","Palena"]
    },

    {
      "region": "Ays??n del Gral. Carlos Ib????ez del Campo",
      "ciudades": ["Lago Verde",
        "OHiggins","Aysen","Chile Chico","Coihaique","Cochrane","Tortel","Cisnes","Rio Iba??ez","Guaitecas"]
    },

    {
      "region": "Magallanes y de la Ant??rtica Chilena",
      "ciudades": ["Ant??rtica","Cabo de Hornos","Laguna Blanca","Punta Arenas","R??o Verde","San Gregorio","Porvenir","Primavera","Timaukel","Natales",
        "Torres del Paine"]
    },

    {
      "region": "De los R??os",
      "ciudades": ["Los r??os","Mariquina","Lago Ranco","R??o Bueno","La Uni??n","Futrono","Valdivia","M??fil","Panguipulli","Lanco","Paillaco","Corral"]
    },

    {
      "region": "Arica y Parinacota",
      "ciudades": ["Arica","Putre","General Lagos","Camarones"]
    },

    {
      "region": "??uble",
      "ciudades": ["Cobquecura","Coelemu","Ninhue","Portezuelo","Quirihue","R??nquil","Trehuaco","Bulnes","Chill??n Viejo","Chill??n","El Carmen","Pemuco","Pinto","Quill??n","San Ignacio","Yungay","Coihueco","??iqu??n","San Carlos","San Fabi??n","San Nicol??s"]
    }

  ];
}

