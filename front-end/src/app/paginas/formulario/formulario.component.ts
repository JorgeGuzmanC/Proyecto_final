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
      contraseña:this.formulario.get("contra").value,
      pregunta: this.formulario.get("pregunta").value,
      respuesta: this.formulario.get("respuesta").value
    }
    
    this.ServicioService.addUsuario(this.newUsuario).subscribe();

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Usuario creado con éxito',
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
      "region": "Tarapacá",
      "ciudades": ["Camiña", "Pozo Almonte", "Iquique", "Alto Hospicio", "Colchane", "Huara", "Pica"]
    },
    {
      "region": "Antofagasta",
      "ciudades": ["María Elena", "Mejillones", "Antofagasta,", "Tocopilla", "Ollague", "San Pedro de Atacama", "Sierra gorda", "Calama", "Taltal"]
    },
    {
      "region": "Atacama",
      "ciudades": ["Chañaral","Diego de Almagro","Caldera","Copiapó","Tierra Amarilla","Alto del Carmen","Freirina","Huasco","Vallenar"]
    },

    {
      "region": "Coquimbo",
      "ciudades": ["Canela","Illapel","Los Vilos","Salamanca","Andacollo","Coquimbo","La Higuera","La Serena","Paihuano","Vicuña","Combarbalá","Monte Patria","Ovalle","Punitaqui","Río Hurtado"]
    },

    {
      "region": "Valparaíso",
      "ciudades": ["Isla de Pascua","Calle Larga","Los Andes","Rinconada","San Esteban","Cabildo","La Ligua","Papudo","Petorca","Zapallar","Hijuelas","La Calera","La Cruz","Nogales","Quillota","Algarrobo","Cartagena","El Quisco","El Tabo","San Antonio","Santo Domingo","Catemu","Llay-Llay","Panquehue","Putaendo","San Felipe","Santa María","Casablanca","Concón","Juan Fernández","Puchuncaví","Quintero","Valparaíso","Viña del Mar","Limache","Olmué","Quilpué","Villa Alemana"]
    },

    {
      "region": "Región Metropolitana",
      "ciudades": ["Colina","Lampa","Til Til","Pirque","Puente Alto","San José de Maipo","Buin","Calera de Tango","Paine","San Bernardo","Alhué","Curacaví","María Pinto","Melipilla","San Pedro","Cerrillos","Cerro Navia","Conchalí","El Bosque","Estación Central","Huechuraba","Independencia","La Cisterna","La Granja","La Florida","La Pintana","La Reina","Las Condes","Lo Barnechea","Lo Espejo","Lo Prado","Macul","Maipú","Ñuñoa","Pedro Aguirre Cerda","Peñalolén","Providencia","Pudahuel","Quilicura","Quinta Normal","Recoleta","Renca","San Miguel","San Joaquín","San Ramón","Santiago","Vitacura","El Monte","Isla de Maipo","Padre Hurtado","Peñaflor","Talagante"]
    },

    {
      "region": "Del Libertador General Bernardo Ohiggins",
      "ciudades": ["Codegua","Coinco","Coltauco","Doñihue","Graneros","Las Cabras","Machalí","Malloa","Mostazal","Olivar","Peumo","Pichidegua","Quinta de Tilcoco","Rancagua","Rengo","Requínoa","San Vicente de Tagua Tagua","Litueche","Marchigüe","Navidad","Paredones","Pichilemu","Chépica","Chimbarongo","Lolol","Nancagua","Palmilla","Peralillo","Placilla","Pumanque","San Fernando","Santa Cruz"]
    },

    {
      "region": "Del Maule",
      "ciudades": ["Cauquenes","Chanco","Pelluhue","Curicó","Hualañé","Licantén","Molina","Rauco","Romeral","Sagrada Familia","Teno","Vichuquén","Colbún","Linares","Longaví","Parral","Retiro","San Javier","Villa Alegre","Yerbas Buenas","Constitución","Curepto","Empedrado","Maule","Pelarco","Pencahue","Río Claro","San Clemente","San Rafael","Talca"]
    },

    {
      "region": "Del Biobío",
      "ciudades": ["Arauco","Cañete","Contulmo","Curanilahue","Lebu","Los Álamos","Tirúa","Alto Biobío","Antuco","Cabrero","Laja","Los Ángeles","Mulchén","Nacimiento","Negrete","Quilaco","Quilleco","San Rosendo","Santa Bárbara","Tucapel","Yumbel","Chiguayante","Concepción","Coronel","Florida","Hualpén","Hualqui","Lota","Penco","San Pedro de la Paz","Santa Juana","Talcahuano","Tomé"]
    },

    {
      "region": "De la Araucanía",
      "ciudades": ["Carahue","Cholchol","Cunco","Curarrehue","Freire","Galvarino","Gorbea","Lautaro","Loncoche","Melipeuco","Nueva Imperial","Padre Las Casas","Perquenco","Pitrufquén","Pucón","Puerto Saavedra","Temuco","Teodoro Schmidt","Toltén","Vilcún","Villarrica","Angol","Collipulli","Curacautín","Ercilla","Lonquimay","Los Sauces","Lumaco","Purén","Renaico","Traiguén","Victoria",]
    },

    {
      "region": "De los lagos",
      "ciudades": ["Ancud","Castro","Chonchi","Curaco de Vélez","Dalcahue","Puqueldón","Queilén","Quemchi","Quellón","Quinchao","Calbuco","Cochamó","Fresia","Frutillar","Llanquihue","Los Muermos","Maullín","Puerto Montt","Puerto Varas","Osorno","Puerto Octay","Purranque","Puyehue","Río Negro","San Juan de la Costa","San Pablo","Chaitén","Futaleufú","Hualaihué","Palena"]
    },

    {
      "region": "Aysén del Gral. Carlos Ibáñez del Campo",
      "ciudades": ["Lago Verde",
        "OHiggins","Aysen","Chile Chico","Coihaique","Cochrane","Tortel","Cisnes","Rio Ibañez","Guaitecas"]
    },

    {
      "region": "Magallanes y de la Antártica Chilena",
      "ciudades": ["Antártica","Cabo de Hornos","Laguna Blanca","Punta Arenas","Río Verde","San Gregorio","Porvenir","Primavera","Timaukel","Natales",
        "Torres del Paine"]
    },

    {
      "region": "De los Ríos",
      "ciudades": ["Los ríos","Mariquina","Lago Ranco","Río Bueno","La Unión","Futrono","Valdivia","Máfil","Panguipulli","Lanco","Paillaco","Corral"]
    },

    {
      "region": "Arica y Parinacota",
      "ciudades": ["Arica","Putre","General Lagos","Camarones"]
    },

    {
      "region": "Ñuble",
      "ciudades": ["Cobquecura","Coelemu","Ninhue","Portezuelo","Quirihue","Ránquil","Trehuaco","Bulnes","Chillán Viejo","Chillán","El Carmen","Pemuco","Pinto","Quillón","San Ignacio","Yungay","Coihueco","Ñiquén","San Carlos","San Fabián","San Nicolás"]
    }

  ];
}

