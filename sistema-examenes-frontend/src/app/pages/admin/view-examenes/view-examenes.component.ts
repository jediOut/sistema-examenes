import { Component, OnInit } from '@angular/core';
import { ExamenService } from '../../../services/examen.service';
import Swal from 'sweetalert2';
import { Examen } from '../../../models/examen.model';

@Component({
  selector: 'app-view-examenes',
  templateUrl: './view-examenes.component.html',
  styleUrl: './view-examenes.component.css',
})
export class ViewExamenesComponent implements OnInit {
  examenes: Examen[] = [];
  constructor(private examenService: ExamenService) {}
  ngOnInit(): void {
    this.examenService.listarExamenes().subscribe(
      (dato: any) => {
        this.examenes = dato;
        console.log(this.examenes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error al listar los examenes', 'error');
      }
    );
  }
  eliminarExamen(id: number) {
    Swal.fire({
      title: 'Eliminar examen',
      text: '¿Estas segur@ de eliminar el examen?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.examenService.eliminar(id).subscribe(
          (dato) => {
            this.examenes = this.examenes.filter(
              (examen: Examen) => examen.id != id
            );
            Swal.fire(
              'Examen eliminado',
              'El examen ha sido eliminado con éxito',
              'success'
            );
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar el examen', 'error');
          }
        );
      }
    });
  }
}
