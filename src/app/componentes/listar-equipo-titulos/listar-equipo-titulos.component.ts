import { Component, OnInit } from '@angular/core';
import { GanadoresTitulosService } from '../../services/ganadores-titulos.service';
import { ActivatedRoute } from '@angular/router';
import { Ganador } from '../../ganador';
import { TituloService } from '../../services/titulo.service';
import { Titulo } from '../../titulo';
import { EquipoService } from '../../services/equipo.service';
import { Equipo } from '../../equipo';

@Component({
  selector: 'app-listar-equipo-titulos',
  templateUrl: './listar-equipo-titulos.component.html',
  styleUrls: ['./listar-equipo-titulos.component.css']
})

export class ListarEquipoTitulosComponent implements OnInit{

  idEquipo: number;
  titulosGanador: Ganador[];

  titulos: Titulo[] = [];
  idtitulos: number[] = [];


  equipoTitulos: Equipo;

  constructor(private ganadoresServicio: GanadoresTitulosService, private tituloServicio: TituloService, private route: ActivatedRoute,private equipoServicio: EquipoService) { } 

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idEquipo = params['idEquipo'];
    });

    this.obtenerEquipo(); 

    this.obtenerTitulosEquipoPasado();
  }


  obtenerEquipo(){
    this.equipoServicio.obtenerEquipoId(this.idEquipo).subscribe(equipo=>{
      this.equipoTitulos = equipo;
    });

  }

  obtenerTitulosEquipoPasado() {
    console.log(this.idEquipo);
    this.ganadoresServicio.obtenerTitulosGanador(this.idEquipo).subscribe(titulos => {
      this.titulosGanador = titulos;

     
      this.titulosGanador.forEach(titulo => {
        this.idtitulos.push(titulo.titulo);
      });

      console.log(this.idtitulos);


      
      if (this.titulosGanador) {
        this.titulosGanador.forEach(titulo => {


          this.tituloServicio.obtenerTitulo(titulo.titulo).subscribe(titulosArray => {
            titulosArray.forEach(titu => {

              this.titulos.push(titu);
            });
          });
        });
      }
    });
    console.log(this.titulos);
  }
}