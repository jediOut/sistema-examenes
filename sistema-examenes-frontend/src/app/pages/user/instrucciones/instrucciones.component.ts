import { Component, OnInit } from '@angular/core';
import { Examen } from '../../../models/examen.model';
import { ExamenService } from '../../../services/examen.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instrucciones',
  templateUrl: './instrucciones.component.html',
  styleUrl: './instrucciones.component.css',
})
export class InstruccionesComponent implements OnInit {
  id: number = 0;
  examen: Examen = new Examen();
  constructor(
    private examenService: ExamenService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.examenService.obtenerExamen(this.id).subscribe(
      (dato) => {
        console.log(dato);
        this.examen = dato;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  empezarExamen() {
    Swal.fire({
      title: '¿Quieres comenzar el examen?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Empezar',
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/start/' + this.id]);
      }
    });
  }
}
