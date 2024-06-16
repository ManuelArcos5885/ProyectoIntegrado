import { Component, OnInit } from '@angular/core';
import { Ganador } from '../../ganador';
import { GanadoresTitulosService } from '../../services/ganadores-titulos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipoService } from '../../services/equipo.service';
import { TituloService } from '../../services/titulo.service';
import { Titulo } from '../../titulo';
import { Equipo } from '../../equipo';

@Component({
  selector: 'app-crear-ganador',
  templateUrl: './crear-ganador.component.html',
  styleUrl: './crear-ganador.component.css'
})
export class CrearGanadorComponent implements OnInit{
  ganador:Ganador=new Ganador();

  idEquipoPasado:number;

  equipos:Equipo[];

  titulos:Titulo[];


  constructor(private servicioGanador:GanadoresTitulosService,private route: ActivatedRoute, private router:Router, private servicioEquipo:EquipoService, private servicioTitulo:TituloService){}


  public async ngOnInit(): Promise<void> {
    this.route.params.subscribe(params => {
      this.idEquipoPasado = params['equipoPasado'];
      
    });

    await this.timeout(200);

    if(this.idEquipoPasado){
      console.log("id EQUIPO PASADO: ");
      console.log(this.idEquipoPasado);

      this.ganador.equipo = this.idEquipoPasado;
    }

    this.obtenerEquipos();

    this.obtenerTitulos();
  }

  timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  obtenerEquipos(){
    this.servicioEquipo.obtenerTodosEquipos().subscribe(equipos => {
      this.equipos = equipos; 
    });
  }

  obtenerTitulos(){
    this.servicioTitulo.obtenerListaTitulos().subscribe(titulos => {
      this.titulos = titulos;
    });
  }


  guardarGanador(){
    console.log("Titulo nueva:" + this.ganador.equipo);
    console.log("Titulo nueva:" + this.ganador.titulo);
    console.log("Titulo nueva:" + this.ganador.temporada);
    this.servicioGanador.registrarGanador(this.ganador).subscribe(dato=>{
      console.log(dato);
      this.irListaComunidad();
    },error=>console.log(error));
  }

  irListaComunidad(){
    this.router.navigate(["ListarTitulos"]);
  }


  onSubmit() {
    var validacion = this.validar();
    if (validacion !== "") {
      alert(validacion);
      return; // No enviar el formulario si hay errores de validación
    } else {
      alert("insertado");

      this.guardarGanador();
    }
  }


  validar() {
    let error: string = "";
    
    if (!this.ganador.equipo || !this.ganador.titulo || !this.ganador.temporada) {
      error = "Por favor, complete todos los campos obligatorios. Equipo, Titulo y Temporada";
      return error;
    }

    return error;
}



}
