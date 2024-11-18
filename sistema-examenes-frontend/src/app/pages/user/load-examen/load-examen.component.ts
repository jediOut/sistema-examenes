import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamenService } from '../../../services/examen.service';
import { Examen } from '../../../models/examen.model';

@Component({
  selector: 'app-load-examen',
  templateUrl: './load-examen.component.html',
  styleUrl: './load-examen.component.css',
})
export class LoadExamenComponent implements OnInit {
  id: number = 0;
  examenes: Examen[] = [];
  constructor(
    private route: ActivatedRoute,
    private examenService: ExamenService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id == 0) {
        console.log('Cargando todos los exámenes');
        this.examenService.obtenerExamenesActivos().subscribe(
          (dato: Examen[]) => {
            this.examenes = dato;
            console.log(this.examenes);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        console.log('Cargando un exámen en especifico');
        this.examenService.obtenerExamenesActivosDeUnaCategoria(this.id).subscribe(
          (dato: Examen[]) => {
            this.examenes = dato;
            console.log(this.examenes);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }
}
