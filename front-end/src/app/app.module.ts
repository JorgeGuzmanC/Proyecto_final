import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { MedicosComponent } from './paginas/medicos/medicos.component';
import { EspecialidadesComponent } from './paginas/especialidades/especialidades.component';
import { LoginComponent } from './paginas/login/login.component';
import { FormularioComponent } from './paginas/formulario/formulario.component';
import { CitasComponent } from './paginas/citas/citas.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
import { VistaCitasComponent } from './paginas/vista-citas/vista-citas.component';
import { VerUsuariosComponent } from './components/ver-usuarios/ver-usuarios.component';
import { AgregarComponent } from './components/agregar/agregar.component';
import { ModificarComponent } from './components/modificar/modificar.component';
import { BuscadorPipe } from './pipes/buscador.pipe';
import { RecuperarContraComponent } from './components/recuperar-contra/recuperar-contra.component';
import { UrgenciasComponent } from './paginas/urgencias/urgencias.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    MedicosComponent,
    EspecialidadesComponent,
    LoginComponent,
    FormularioComponent,
    CitasComponent,
    AdminComponent,
    VistaCitasComponent,
    VerUsuariosComponent,
    AgregarComponent,
    ModificarComponent,
    BuscadorPipe,
    RecuperarContraComponent,
    UrgenciasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
