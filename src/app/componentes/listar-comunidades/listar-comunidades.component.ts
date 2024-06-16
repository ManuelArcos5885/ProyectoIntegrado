import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Comunidad } from '../../comunidad';
import { map } from 'rxjs';
import { ComunidadService } from '../../services/comunidad.service';

@Component({
  selector: 'app-listar-comunidades',
  templateUrl: './listar-comunidades.component.html',
  styleUrl: './listar-comunidades.component.css'
})
export class ListarComunidadesComponent implements OnInit{

  comunidades:Comunidad[];

  constructor(private comunidadServicio:ComunidadService){ }

  ngOnInit(): void {
    this.obtenerComunidades();
  }


  
  private obtenerComunidades() {
    this.comunidadServicio.obtenerListaComunidades().pipe(
      map(comunidades => {
        return comunidades.map(comunidad => {
          return {
            ...comunidad,

          };
        });
      })
    ).subscribe(comunidades => {
      this.comunidades = comunidades;
    });
  }
}
