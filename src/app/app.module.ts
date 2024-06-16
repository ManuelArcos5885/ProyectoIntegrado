import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { ListarUsuariosComponent } from './componentes/listar-usuarios/listar-usuarios.component';
import { CrearUsuariosComponent } from './componentes/crear-usuarios/crear-usuarios.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { PieComponent } from './componentes/pie/pie.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ListarComunidadesComponent } from './componentes/listar-comunidades/listar-comunidades.component';
import { DetallesComunidadComponent } from './componentes/detalles-comunidad/detalles-comunidad.component';
import { CrearEquipoComponent } from './componentes/crear-equipo/crear-equipo.component';
import { DetallesEquipoComponent } from './componentes/detalles-equipo/detalles-equipo.component';
import { DetallesEstadioComponent } from './componentes/detalles-estadio/detalles-estadio.component';
import { CrearEstadioComponent } from './componentes/crear-estadio/crear-estadio.component';
import { ListarEstadiosComponent } from './componentes/listar-estadios/listar-estadios.component';
import { ListarEquiposComponent } from './componentes/listar-equipos/listar-equipos.component';
import { CrearComunidadComponent } from './componentes/crear-comunidad/crear-comunidad.component';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DetallesUsuarioComponent } from './componentes/detalles-usuario/detalles-usuario.component';
import { LoginComponent } from './componentes/login/login.component';
import { ListarTodosTitulosComponent } from './componentes/listar-todos-titulos/listar-todos-titulos.component';
import { ListarEquipoTitulosComponent } from './componentes/listar-equipo-titulos/listar-equipo-titulos.component';
import { CrearTituloComponent } from './componentes/crear-titulo/crear-titulo.component';
import { CrearGanadorComponent } from './componentes/crear-ganador/crear-ganador.component';
import { CookieService } from 'ngx-cookie-service';
import { EditarTituloComponent } from './componentes/editar-titulo/editar-titulo.component';
import { EditarEquipoComponent } from './componentes/editar-equipo/editar-equipo.component';
import { EuropaLeagueComponent } from './componentes/europa-league/europa-league.component';
import { ChampionsLeagueComponent } from './componentes/champions-league/champions-league.component';
import { LaLigaComponent } from './componentes/la-liga/la-liga.component';
import { SegundaDivisionComponent } from './componentes/segunda-division/segunda-division.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ElegirClubComponent } from './componentes/elegir-club/elegir-club.component';
import { NetBallComponent } from './componentes/net-ball/net-ball.component';
import { EquiposSeleccionadoGolesComponent } from './componentes/equipos-seleccionado-goles/equipos-seleccionado-goles.component';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';
import { EquiposSeleccionadoPartidosComponent } from './componentes/equipos-seleccionado-partidos/equipos-seleccionado-partidos.component';
import { EquiposSeleccionadoEquipacionComponent } from './componentes/equipos-seleccionado-equipacion/equipos-seleccionado-equipacion.component';
import { EquiposSeleccionadoEstadioComponent } from './componentes/equipos-seleccionado-estadio/equipos-seleccionado-estadio.component';
import { EquiposSeleccionadoTitulosComponent } from './componentes/equipos-seleccionado-titulos/equipos-seleccionado-titulos.component';
import { CiudadEquipoComponent } from './componentes/ciudad-equipo/ciudad-equipo.component';
import { EditarEquipacionComponent } from './componentes/editar-equipacion/editar-equipacion.component';
import { EditarGolesComponent } from './componentes/editar-goles/editar-goles.component';
import { EditarPartidosComponent } from './componentes/editar-partidos/editar-partidos.component';
import { EditarUsuarioComponent } from './componentes/editar-usuario/editar-usuario.component';
import { ListarEquiposComunidadComponent } from './componentes/listar-equipos-comunidad/listar-equipos-comunidad.component';
import { CrearCanalComponent } from './componentes/crear-canal/crear-canal.component';
import { ElegirUsuariosComponent } from './componentes/elegir-usuarios/elegir-usuarios.component';
import { ModalAdvertenciaComponent } from './componentes/modal-advertencia/modal-advertencia.component';
import { PapeleraComponent } from './componentes/papelera/papelera.component';


@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    PrincipalComponent,
    ListarUsuariosComponent,
    CrearUsuariosComponent,
    UsuariosComponent,
    PieComponent,
    ListarComunidadesComponent,
    DetallesComunidadComponent,
    CrearEquipoComponent,
    DetallesEquipoComponent,
    DetallesEstadioComponent,
    CrearEstadioComponent,
    ListarEstadiosComponent,
    ListarEquiposComponent,
    CrearComunidadComponent,
    DetallesUsuarioComponent,
    LoginComponent,
    ListarTodosTitulosComponent,
    ListarEquipoTitulosComponent,
    CrearTituloComponent,
    CrearGanadorComponent,
    EditarTituloComponent,
    EditarEquipoComponent,
    EuropaLeagueComponent,
    ChampionsLeagueComponent,
    LaLigaComponent,
    SegundaDivisionComponent,
    InicioComponent,
    ElegirClubComponent,
    NetBallComponent,
    EquiposSeleccionadoGolesComponent,
    PerfilUsuarioComponent,
    EquiposSeleccionadoPartidosComponent,
    EquiposSeleccionadoEquipacionComponent,
    EquiposSeleccionadoEstadioComponent,
    EquiposSeleccionadoTitulosComponent,
    CiudadEquipoComponent,
    EditarEquipacionComponent,
    EditarGolesComponent,
    EditarPartidosComponent,
    EditarUsuarioComponent,
    ListarEquiposComunidadComponent,
    CrearCanalComponent,
    ElegirUsuariosComponent,
    ModalAdvertenciaComponent,
    PapeleraComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //servicio
    HttpClientModule,
    //para formularios insertar registros
    FormsModule,
    ReactiveFormsModule,
    

    
    
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
