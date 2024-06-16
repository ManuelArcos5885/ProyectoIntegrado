import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-champions-league',
  templateUrl: './champions-league.component.html',
  styleUrl: './champions-league.component.css'
})
export class ChampionsLeagueComponent implements AfterViewInit {
  
  constructor() { }

  ngAfterViewInit() {
    // Obtener el elemento de video
    const video = document.getElementById('video-background') as HTMLVideoElement;
    
    // Reproducir el video
    video.play();
  }
}
