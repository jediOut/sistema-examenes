import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../../models/examen.model';
import { CategoriaService } from '../../../services/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  categorias: Categoria[] = [];
  constructor(
    private categoriaService: CategoriaService,
    private snack: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(
      (dato: Categoria[]) => {
        this.categorias = dato;
      },
      (error) => {
        this.snack.open('Error al cargar las categorias', '', {
          duration: 3000,
        });
        console.log(error);
      }
    );
  }
  
}
