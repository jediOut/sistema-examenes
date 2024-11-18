import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Categoria } from '../../../models/examen.model';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrl: './add-categoria.component.css',
})
export class AddCategoriaComponent implements OnInit {
  categoria: Categoria = new Categoria();
  constructor(
    private categoriaService: CategoriaService,
    private snack: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit(): void {}
  formSubmit() {
    if (this.categoria.titulo.trim() == '' || this.categoria.titulo == null) {
      this.snack.open('El titulo es requerido !!', '', {
        duration: 3000,
      });
      return;
    }
    this.categoriaService.agregarCaegoria(this.categoria).subscribe(
      (dato: any) => {
        this.categoria.titulo = '';
        this.categoria.descripcion = '';
        Swal.fire(
          'Categoria guardada',
          'La categoria se ha guardado con éxito',
          'success'
        );
        this.router.navigate(['/admin/categorias']);
      },
      (error) => {
        console.log(error);
        Swal.fire(
          'Error !!',
          'Hubo un error al intentar guardar la categoria',
          'error'
        );
      }
    );
  }
}
