import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pregunta } from '../../../models/examen.model';
import { PreguntaService } from '../../../services/pregunta.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-examen-preguntas',
  templateUrl: './view-examen-preguntas.component.html',
  styleUrl: './view-examen-preguntas.component.css',
})
export class ViewExamenPreguntasComponent implements OnInit {
  id: number = 0;
  titulo: string = '';
  preguntas: Pregunta[] = [];
  constructor(
    private route: ActivatedRoute,
    private preguntaService: PreguntaService,
    private snack: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.titulo = this.route.snapshot.params['titulo'];
    this.preguntaService.listarPreguntasDelExamen(this.id).subscribe(
      (dato: any) => {
        console.log(dato);
        this.preguntas = dato;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  eliminarPregunta(id: number) {
    Swal.fire({
      title: 'Eliminar Pregunta',
      text: '¿Estas seguro, quieres eliminar esta pregunta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.preguntaService.eliminar(id).subscribe(
          (dato) => {
            this.snack.open('Pregunta eliminada', '', {
              duration: 3000,
            });
            this.preguntas = this.preguntas.filter(
              (pregunta: Pregunta) => pregunta.id != id
            );
          },
          (error) => {
            this.snack.open('Error al eliminar la pregunta', '', {
              duration: 3000,
            });
            console.log(error);
          }
        );
      }
    });
  }
}
