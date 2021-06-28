import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { MedicosComponent } from './paginas/medicos/medicos.component';
import { EspecialidadesComponent } from './paginas/especialidades/especialidades.component';
import { LoginComponent } from './paginas/login/login.component';
import { FormularioComponent } from './paginas/formulario/formulario.component';
import { CitasComponent } from './paginas/citas/citas.component';
import { VerUsuariosComponent } from './components/ver-usuarios/ver-usuarios.component';
import { VistaCitasComponent } from './paginas/vista-citas/vista-citas.component';
import { AdminComponent } from './components/admin/admin.component';
import { AgregarComponent } from './components/agregar/agregar.component';
import { ModificarComponent } from './components/modificar/modificar.component'; 
import { RecuperarContraComponent } from './components/recuperar-contra/recuperar-contra.component';
import { UrgenciasComponent } from './paginas/urgencias/urgencias.component';

const routes: Routes = [
  { path: '', component:InicioComponent},
  { path: 'medicos', component:MedicosComponent},
  { path: 'especialidades', component:EspecialidadesComponent},
  { path: 'urgencias', component:UrgenciasComponent},
  { path: 'login', component:LoginComponent},
  { path: 'formulario', component:FormularioComponent},
  { path: 'citas', component:CitasComponent},
  { path: 'homeAdmin', component:VerUsuariosComponent},
  { path: 'vista-citas', component:VistaCitasComponent},
  { path: 'admin_citas', component:AdminComponent},
  { path: 'add', component:AgregarComponent},
  { path: 'edit/:id', component:ModificarComponent},
  { path: 'recuperarContra', component:RecuperarContraComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
