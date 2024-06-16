import { Component, OnInit } from '@angular/core';
import { GanadoresTitulosService } from '../../services/ganadores-titulos.service';
import { EquipoService } from '../../services/equipo.service';
import { TituloService } from '../../services/titulo.service';
import { Ganador } from '../../ganador';
import { Equipo } from '../../equipo';
import { Titulo } from '../../titulo';
import { Router, ActivatedRoute } from '@angular/router';
import { time } from 'node:console';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-editar-titulo',
  templateUrl: './editar-titulo.component.html',
  styleUrls: ['./editar-titulo.component.css']
})
export class EditarTituloComponent implements OnInit {


  cargado:boolean;

  nombreEquipo: string;
  nombretitulo: string;
  temporadapasada:string;

  idEquipoPasado:number

  equipoPasado: Equipo = new Equipo();
  tituloPasado: Titulo = new Titulo();

  ganadorEditar:Ganador;


  
  equipos: Equipo[];
  titulos: Titulo[];

  constructor(
    private servicioGanador: GanadoresTitulosService,private router: Router,private route: ActivatedRoute,private servicioEquipo: EquipoService,private servicioTitulo: TituloService) {}

  public async ngOnInit(): Promise<void> {
    this.route.params.subscribe(params => { 
      this.nombreEquipo = params['nombreEquipo'];

      this.nombretitulo = params['nombreTitulo'];

      this.temporadapasada = params['temporada'];

      this.idEquipoPasado = params['idEquipo'];
      

      this.obtenerGanadorPasado(this.nombreEquipo,this.nombretitulo,this.temporadapasada);
    });

    await this.timeout(200);



    this.obtenerEquipos();
    this.obtenerTitulos();

    await this.timeout(200);

    
          
    console.log("GANADOR EDITAR: ");
    console.log(this.ganadorEditar);
    console.log(this.equipos);
  }


  timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  
  public async obtenerGanadorPasado(nombreEquipo: string,nombreTitulo:string,temporada:string) {
    console.log("equipo: " + nombreEquipo);
    console.log("titulo" + nombreTitulo);

    this.servicioGanador.obtenerGanadorPasado(nombreEquipo,nombreTitulo,temporada).subscribe(ganador =>{
      console.log("GANADOR OBTENIDO 2: ");
      console.log(ganador);
      this.ganadorEditar = ganador;

      console.log("equipoo y titulo: ");
      console.log(ganador);
      console.log(this.ganadorEditar);

    });

    await this.timeout(200);

    console.log("GANADOR OBTENIDO: ");
    console.log(this.ganadorEditar);
    
  }
  

  obtenerEquipos() {
    this.equipos = [];
    this.servicioEquipo.obtenerTodosEquipos().subscribe(equipos => {
      this.equipos = equipos;
    });
  }

  obtenerTitulos() {
    this.titulos = [];
    this.servicioTitulo.obtenerListaTitulos().subscribe(titulos => {
      this.titulos = titulos;
    });
  }
  
  guardarGanador() {

    this.servicioGanador.actualizarGanador(this.ganadorEditar).subscribe(dato => {
      console.log(dato);
      this.irListaComunidad();
    }, error => console.log(error));
  }

  irListaComunidad() {
    alert("Actualizado correctamente");
    this.router.navigate(["ListarTitulos"]);
  }

  onSubmit() {
    console.log("GANADOR A GUARDAR: ");
    console.log(this.ganadorEditar);
    var validacion = this.validar();
    if (validacion !== "") {
      alert(validacion);
      return;
    } else {
      this.guardarGanador();
    }
  }

  validar() {
    let error: string = "";
    console.log("VALIDAR GANADOR");
    console.log(this.ganadorEditar);
    if (this.ganadorEditar.equipo == null || this.ganadorEditar.titulo == null || this.ganadorEditar.temporada == null) {
      error = "Por favor, complete todos los campos obligatorios. Equipo, Titulo y Temporada";
      return error;
    }

    return error;
  }
}