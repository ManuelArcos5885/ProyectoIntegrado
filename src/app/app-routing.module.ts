import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarUsuariosComponent } from './componentes/listar-usuarios/listar-usuarios.component';
import { CrearUsuariosComponent } from './componentes/crear-usuarios/crear-usuarios.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { ListarComunidadesComponent } from './componentes/listar-comunidades/listar-comunidades.component';
import { CrearComunidadComponent } from './componentes/crear-comunidad/crear-comunidad.component';
import { ListarEquiposComponent } from './componentes/listar-equipos/listar-equipos.component';
import { DetallesEquipoComponent } from './componentes/detalles-equipo/detalles-equipo.component';
import { DetallesUsuarioComponent } from './componentes/detalles-usuario/detalles-usuario.component';
import { LoginComponent } from './componentes/login/login.component';
import { ListarEquipoTitulosComponent } from './componentes/listar-equipo-titulos/listar-equipo-titulos.component';
import { ListarTodosTitulosComponent } from './componentes/listar-todos-titulos/listar-todos-titulos.component';
import { CrearEquipoComponent } from './componentes/crear-equipo/crear-equipo.component';
import { CrearGanadorComponent } from './componentes/crear-ganador/crear-ganador.component';
import { CrearTituloComponent } from './componentes/crear-titulo/crear-titulo.component';
import { EditarTituloComponent } from './componentes/editar-titulo/editar-titulo.component';
import { GuardianGuard } from './guardianes/guardian.guard';
import { EuropaLeagueComponent } from './componentes/europa-league/europa-league.component';
import { ChampionsLeagueComponent } from './componentes/champions-league/champions-league.component';
import { LaLigaComponent } from './componentes/la-liga/la-liga.component';
import { SegundaDivisionComponent } from './componentes/segunda-division/segunda-division.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ElegirClubComponent } from './componentes/elegir-club/elegir-club.component';
import { NetBallComponent } from './componentes/net-ball/net-ball.component';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';
import { AdminGuard } from './guardianes/admin.guard';
import { CiudadEquipoComponent } from './componentes/ciudad-equipo/ciudad-equipo.component';
import { ListarEquiposComunidadComponent } from './componentes/listar-equipos-comunidad/listar-equipos-comunidad.component';
import { PapeleraComponent } from './componentes/papelera/papelera.component';

const routes: Routes = [
  {path:'ListarUsuarios',component:ListarUsuariosComponent,canActivate:[GuardianGuard]},
  {path:'Login',component:LoginComponent},
  {path:'ListarComunidades',component:ListarComunidadesComponent},
  {path:'ListarEquipoTitulos',component:ListarEquipoTitulosComponent},
  {path:'ListarTitulos',component:ListarTodosTitulosComponent},
  {path:'ListarEquipos/:division',component:ListarEquiposComponent},
  { path: 'ListarEquiposComunidad/:comunidadEquipo', component: ListarEquiposComunidadComponent },
  { path: 'ListarEquiposComunidad/:comunidadEquipo/:ciudadEquipo?', component: ListarEquiposComunidadComponent },
  {path:'DetallesEquipo',component:DetallesEquipoComponent},
  {path:'DetallesUsuario',component:DetallesUsuarioComponent},
  {path:'EuropaLeague',component:EuropaLeagueComponent},
  {path:'ChampionsLeague',component:ChampionsLeagueComponent},
  {path:'laliga',component:LaLigaComponent},
  {path:'segunda',component:SegundaDivisionComponent},
  {path:'inicio',component:InicioComponent},
  {path:'CiudadEquipo',component:CiudadEquipoComponent},
  {path:'ElegirClub',component:ElegirClubComponent,canActivate:[GuardianGuard]},
  {path:'CrearTitulo',component:CrearTituloComponent,canActivate:[GuardianGuard]},
  {path:'CrearGanador',component:CrearGanadorComponent,canActivate:[GuardianGuard]},
  {path:'CrearUsuario',component:CrearUsuariosComponent},
  {path:'CrearComunidad',component:CrearComunidadComponent,canActivate:[GuardianGuard]},
  {path:'CrearEquipo',component:CrearEquipoComponent,canActivate:[GuardianGuard]},
  {path:'EditarTitulo',component:EditarTituloComponent,canActivate:[GuardianGuard]},
  {path:'Perfil',component:PerfilUsuarioComponent,canActivate:[GuardianGuard]},
  {path:'NetBall',component:NetBallComponent},
  {path:'Papelera',component:PapeleraComponent,canActivate:[AdminGuard]},
  {path:'',redirectTo:'/inicio', pathMatch:'full'},
  {path:'**',component: InicioComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
