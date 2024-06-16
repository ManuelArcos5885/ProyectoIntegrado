import { Component, OnInit } from '@angular/core';
import { EquipoService } from '../../services/equipo.service';

import { ComunidadService } from '../../services/comunidad.service';
import { Comunidad } from '../../comunidad';
import { Equipo } from '../../equipo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-equipo',
  templateUrl: './crear-equipo.component.html',
  styleUrl: './crear-equipo.component.css'
})
export class CrearEquipoComponent implements OnInit{


  equipo:Equipo=new Equipo();

  comunidades:Comunidad[];

  selectedFile: File | null = null;
  imageUrlBandera: any;
  imageUrlEscudo: any;


  constructor(private servicioEquipo:EquipoService, private router:Router, private servicioComunidad:ComunidadService){}

  ngOnInit(): void {
    this.equipo.borrado = 0;

    this.obtenerComunidades();
  }

  guardarEquipo(){
    console.log("Equipo nueva:" + this.equipo);
    this.servicioEquipo.registrarEquipo(this.equipo).subscribe(dato=>{
      console.log(dato);
      this.irListaComunidad();
    },error=>console.log(error));
  }

  irListaComunidad(){
    this.router.navigate(["ListarEquipos"]);
  }

  


  onSubmit() {
    var validacion = this.validar();
    if (validacion !== "") {
      alert(validacion);
      return; // No enviar el formulario si hay errores de validación
    } else {
      alert("insertado");

      this.guardarEquipo();
    }
  }



  validar() {
    let error: string = "";
  

    
    if (!this.equipo.comunidad_nombre || !this.equipo.equipo_nombre || !this.equipo.escudo_equipo || !this.equipo.ciudad_nombre || !this.equipo.division_actual) {
      error = "Por favor, complete todos los campos obligatorios. Nombre, comunidad,Ciudad, Division, y escudo";
      return error;
    }

    return error;
}





  obtenerComunidades(){
    this.servicioComunidad.obtenerListaComunidades().subscribe(comunidades => {
      this.comunidades = comunidades;
    });
  }




  onFileSelected(event: any,tipo:string) {
    this.selectedFile = event.target.files[0] as File; // Obtener la imagen seleccionada por el usuario
    this.previewImage(tipo); // Mostrar la vista previa de la imagen seleccionada
  }
  
  previewImage(tipo:string) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      if(tipo=="Escudo"){
        this.imageUrlEscudo = e.target.result;
      }
      else{
        this.imageUrlBandera = e.target.result;
      }
      
    };
    reader.readAsDataURL(this.selectedFile as Blob);
  }
  

}
